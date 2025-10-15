import type { Session } from "@supabase/supabase-js";

declare module 'hono' {
  interface ContextVariableMap {
    session: Session
    validated: unknown;
  }

}

