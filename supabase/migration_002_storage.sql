insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('qr-logos', 'qr-logos', true, 1048576, array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do nothing;

-- Users can only upload/delete inside a folder named after their own user id.
create policy "logo upload own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'qr-logos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "logo delete own folder" on storage.objects for delete to authenticated
  using (bucket_id = 'qr-logos' and (storage.foldername(name))[1] = auth.uid()::text);
