import { type MiddlewareHandler } from 'hono';
import { ZodType } from 'zod';

export const validateJson = <T extends ZodType>(
  schema: T
): MiddlewareHandler => {
  return async (c, next) => {
    try {
      const body = await c.req.json();
      const parsed = schema.parse(body);
      c.set('validated', parsed);
      await next();
    } catch (err) {
      if (err instanceof Error && 'issues' in err) {
        return c.json({ error: 'Validation failed', details: (err as any).issues }, 400);
      }
      return c.json({ error: 'Invalid JSON' }, 400);
    }
  };
};

