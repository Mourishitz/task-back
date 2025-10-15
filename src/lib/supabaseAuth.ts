import { getRedis } from '../db/redis.js';
import type { Session } from '@supabase/supabase-js';


export async function saveSession(session: Session) {
  getRedis().set(`session:${session.access_token}`, JSON.stringify(session), {
    EX: session.expires_in,
  });
}

export async function getSession(token: string): Promise<Session | null> {
  const sessionData = await getRedis().get(`session:${token}`);
  if (!sessionData) return null;
  return JSON.parse(sessionData) as Session;
}

export async function deleteSession(token: string) {
  await getRedis().del(`session:${token}`);
}

