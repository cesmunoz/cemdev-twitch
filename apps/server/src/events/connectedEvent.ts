import { Client } from 'tmi.js';

const handler = (addr: string, port: number) =>
  console.log(`* Connected to ${addr}:${port}`);
const registerEvent = (client: Client) =>
  client.on('connected', handler);
export default registerEvent;
