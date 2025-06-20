import { connectDB } from '../src/db/index.js';
import { app } from '../app.js';
import { createServer } from 'http';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  // ✅ Create an HTTP server that handles the request via Express
  const server = createServer(app);
  server.emit('request', req, res);
}
