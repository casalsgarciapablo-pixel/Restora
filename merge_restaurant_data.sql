-- ============================================================================
-- Sincronización por FUSIÓN (evita que un dispositivo pise el trabajo de otro).
-- Ejecuta TODO este archivo una vez en Supabase → SQL Editor → Run.
--
-- Qué hace: en vez de sobrescribir el bloque `data` entero, aplica solo el "patch"
-- de cambios sobre el estado ACTUAL del servidor, de forma atómica (con bloqueo de
-- fila), así dos camareros a la vez no se pisan:
--   · byId  → pedidos/reservas/chat/anulaciones: alta/cambio/baja por id.
--   · pos   → mesas (estados/nombres/…): por índice (mesas distintas no chocan).
--   · set   → el resto de claves: se escriben enteras solo si ese dispositivo las cambió.
-- ============================================================================

-- ---- DUEÑO (usuario autenticado): solo puede fusionar SU propia fila ----------
create or replace function public.merge_restaurant_data(p_user_id uuid, p_restaurant_name text, p_patch jsonb)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_data jsonb;
  v_key text; v_val jsonb;
  v_coll text; v_arr jsonb; v_up jsonb; v_del jsonb; v_idx text; v_i int;
begin
  -- Seguridad: un dueño solo puede tocar su propia fila.
  if auth.uid() is null or auth.uid() <> p_user_id then
    raise exception 'No autorizado';
  end if;

  select data into v_data from restaurant_data where user_id = p_user_id for update;
  if v_data is null then v_data := '{}'::jsonb; end if;

  v_data := public._aplicar_patch(v_data, p_patch);

  insert into restaurant_data (user_id, restaurant_name, data, updated_at)
  values (p_user_id, coalesce(nullif(p_restaurant_name, ''), ''), v_data, now())
  on conflict (user_id) do update
    set data = excluded.data,
        restaurant_name = coalesce(nullif(excluded.restaurant_name, ''), restaurant_data.restaurant_name),
        updated_at = now();

  return v_data;
end;
$function$;

-- ---- TRABAJADOR (correo + código): valida contra data->'personal' -------------
create or replace function public.staff_merge_data(p_user_id uuid, p_email text, p_codigo text, p_patch jsonb)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_data jsonb;
  v_ok boolean;
begin
  select data into v_data from restaurant_data where user_id = p_user_id for update;
  if v_data is null then raise exception 'Restaurante no encontrado'; end if;

  -- Seguridad: el empleado debe existir en la plantilla con ese correo y código.
  select exists(
    select 1 from jsonb_array_elements(coalesce(v_data->'personal', '[]'::jsonb)) e
    where lower(coalesce(e->>'email', '')) = lower(p_email)
      and upper(coalesce(e->>'codigo', '')) = upper(p_codigo)
  ) into v_ok;
  if not v_ok then raise exception 'No autorizado'; end if;

  v_data := public._aplicar_patch(v_data, p_patch);

  update restaurant_data set data = v_data, updated_at = now() where user_id = p_user_id;
  return v_data;
end;
$function$;

-- ---- Lógica de fusión compartida ---------------------------------------------
create or replace function public._aplicar_patch(v_data jsonb, p_patch jsonb)
returns jsonb
language plpgsql
set search_path to 'public'
as $function$
declare
  v_key text; v_val jsonb;
  v_coll text; v_arr jsonb; v_up jsonb; v_del jsonb; v_idx text; v_i int;
begin
  -- 1) claves enteras que cambió este dispositivo
  if p_patch ? 'set' then
    for v_key, v_val in select key, value from jsonb_each(p_patch->'set') loop
      v_data := jsonb_set(v_data, array[v_key], v_val, true);
    end loop;
  end if;

  -- 2) arrays por id: reemplaza/añade 'up' y elimina 'del', sin tocar el resto
  if p_patch ? 'byId' then
    for v_coll in select jsonb_object_keys(p_patch->'byId') loop
      v_arr := coalesce(v_data->v_coll, '[]'::jsonb);
      v_up  := coalesce(p_patch->'byId'->v_coll->'up',  '[]'::jsonb);
      v_del := coalesce(p_patch->'byId'->v_coll->'del', '[]'::jsonb);
      v_arr := coalesce((
        select jsonb_agg(elem)
        from jsonb_array_elements(v_arr) elem
        where coalesce(elem->>'id', '') not in (
          select coalesce(u->>'id', '') from jsonb_array_elements(v_up) u
          union all
          select d from jsonb_array_elements_text(v_del) d
        )
      ), '[]'::jsonb);
      v_arr := v_arr || v_up;
      v_data := jsonb_set(v_data, array[v_coll], v_arr, true);
    end loop;
  end if;

  -- 3) arrays posicionales (mesas): por índice, o completo si cambió el nº de mesas
  if p_patch ? 'pos' then
    for v_coll in select jsonb_object_keys(p_patch->'pos') loop
      if p_patch->'pos'->v_coll ? 'full' then
        v_data := jsonb_set(v_data, array[v_coll], p_patch->'pos'->v_coll->'full', true);
      else
        v_arr := coalesce(v_data->v_coll, '[]'::jsonb);
        for v_idx, v_val in select key, value from jsonb_each(p_patch->'pos'->v_coll->'idx') loop
          v_i := v_idx::int;
          while jsonb_array_length(v_arr) <= v_i loop v_arr := v_arr || 'null'::jsonb; end loop;
          v_arr := jsonb_set(v_arr, array[v_idx], v_val, true);
        end loop;
        v_data := jsonb_set(v_data, array[v_coll], v_arr, true);
      end if;
    end loop;
  end if;

  return v_data;
end;
$function$;

grant execute on function public.merge_restaurant_data(uuid, text, jsonb) to authenticated;
grant execute on function public.staff_merge_data(uuid, text, text, jsonb) to anon, authenticated;
