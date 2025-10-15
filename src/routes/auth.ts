import { Hono } from 'hono';
import { supabase } from '../lib/supabase.js';
import { validateJson } from '../middleware/validate.js';
import { signInSchema, signUpSchema } from '../validators/authSchema.js';
import type z from 'zod';
import { saveSession } from '../lib/supabaseAuth.js';

const authRoutes = new Hono();

authRoutes.post('/signup', validateJson(signUpSchema), async (c) => {
  const { email, password } = c.get('validated') as z.infer<typeof signUpSchema>;
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return c.json({ error: error.message }, 400);
  return c.json(data);
});

authRoutes.post('/signin', validateJson(signInSchema), async (c) => {
  const { email, password } = c.get('validated') as z.infer<typeof signInSchema>;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return c.json({ error: error.message }, 400);
  saveSession(data.session!);

  return c.json(data);
});

export default authRoutes;

