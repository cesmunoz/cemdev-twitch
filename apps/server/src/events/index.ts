import { Client } from 'tmi.js';
import connectedEvent from './connectedEvent';
import messageEvent from './messageEvent';

const events = [connectedEvent, messageEvent];

const registerTwitchEvents = (client: Client) =>
  events.forEach((event) => event(client));

export default registerTwitchEvents;
