import { type MiddlewareHandler } from 'hono';
import { getSession } from '../lib/supabaseAuth.js';

export const supabaseAuthMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('authorization');
  if (!authHeader) return c.json({ error: 'Missing Authorization header' }, 401);

  const token = authHeader.replace('Bearer ', '');


  const session = await getSession(token);

  if (!session) return c.json({ error: 'Invalid or expired token' }, 401);

  c.set('session', session);
  await next();
};

