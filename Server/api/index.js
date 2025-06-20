import { connectDB } from '../src/db/index.js';
import { app } from '../app.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return app(req, res); // 👈 This runs the express app as a serverless function
}
