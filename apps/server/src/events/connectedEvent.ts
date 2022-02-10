import { Client } from "tmi.js";

const handler = (addr: any, port: any) => console.log(`* Connected to ${addr}:${port}`);
const registerEvent = (client: Client) => client.on("connected", handler);
export default registerEvent;
