import { Client } from 'tmi.js';
// import connectedEvent from './connectedEvent';
import { messageEvent } from './messageEvent';

const events = [messageEvent];

const registerTwitchEvents = (client: Client) => {
  messageEvent(client);
}
//   events.forEach((event) => event(client));

export default registerTwitchEvents;
