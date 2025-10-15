
import { Hono } from 'hono';
import { supabaseAuthMiddleware } from '../middleware/auth.js';
import { supabase } from '../lib/supabase.js';

const filesRoutes = new Hono();

filesRoutes.use('*', supabaseAuthMiddleware);

filesRoutes.get('/download/:id', async (c) => {
  const session = c.get('session');
  const user = session?.user;

  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const profileId = c.req.param('id');

  const { data: files, error: listError } = await supabase.storage
    .from('test-bucket')
    .list(user.id);

  if (listError || !files) {
    console.log('List Error:', listError);
    return c.json({ error: 'Failed to list profiles' }, 500);
  }

  const file = files.find((f) => f.name.startsWith(profileId));

  if (!file) {
    return c.json({ error: 'Profile not found' }, 404);
  }

  const { data, error } = await supabase.storage
    .from('test-bucket')
    .download(`${user.id}/${file.name}`);

  if (error || !data) {
    console.log('Download Error:', error);
    return c.json({ error: 'Failed to download file' }, 500);
  }

  return new Response(data, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${file.name}"`,
    },
  });
});

filesRoutes.post('/upload', async (c) => {
  const session = c.get('session');
  const formData = await c.req.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return c.json({ error: 'Missing file' }, 400);
  }

  const profileId = crypto.randomUUID();

  const path = `${session.user.id}/${profileId}`;


  const ab = await file.arrayBuffer();
  const uint8Array = new Uint8Array(ab);

  const { error } = await supabase.storage
    .from('test-bucket')
    .upload(path, uint8Array, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'application/zip',
    });

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({
    message: 'Profile uploaded successfully',
    profileId,
    path,
  });
});

filesRoutes.get('/metadata/:id', async (c) => {
  const session = c.get('session');
  const user = session?.user;

  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const profileId = c.req.param('id');

  const { data: files, error } = await supabase.storage
    .from('test-bucket')
    .list(user.id);

  if (error || !files) {
    return c.json({ error: error?.message || 'Failed to get metadata' }, 500);
  }

  const file = files.find((f) => f.name.startsWith(`${profileId}`));

  if (!file) {
    return c.json({ error: 'Profile not found' }, 404);
  }

  return c.json({
    id: profileId,
    name: file.name,
    size: file.metadata?.size,
    updated_at: file.updated_at,
  });
});

export default filesRoutes;

