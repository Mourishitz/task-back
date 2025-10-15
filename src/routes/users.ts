import { Hono } from 'hono';
import { supabaseAuthMiddleware } from '../middleware/auth.js';

const userRoutes = new Hono();

userRoutes.use('*', supabaseAuthMiddleware);

userRoutes.get('/me', async (c) => {
  const session = c.get('session');

  return c.json(session.user);
});

export default userRoutes;

