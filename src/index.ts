import 'dotenv/config';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import filesRoutes from './routes/files.js';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.route('/auth', authRoutes);
app.route('/users', userRoutes);
app.route('/files', filesRoutes);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
