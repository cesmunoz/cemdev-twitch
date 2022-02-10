import { Client } from "tmi.js";

const handleDice = (): any => {
  const sides = 6;
  const result = Math.floor(Math.random() * sides) + 1;
  return `You rolled a ${result}`;
};

const handleTwitter = () =>
  "Por favor sigueme por twitter! https://twitter.com/cesmdev";
const handleDevTo = () =>
  "Quieres leer mis articulos? Pasate por Dev.to https://dev.to/cemdev";
const handleInstagram = () =>
  "Quieres ver lo que hago en el dia? Pasate por instagram https://www.instagram.com/cesmdev/";
const handleYouTube = () => "Todavia no hay youtube Kappa";
const handleTikTok = () =>
  "Tenemos TikTok! Entra a https://www.tiktok.com/@cesmdev";
const handleDiscord = () =>
  "Ingresa al discord de la comunidad! https://discord.gg/FG6bkUjz7b";
const handleSilence = (msg: any) => {
  const user = msg.trim().split(" ")[0];
  // TODO: Search for user?
  return `No seas malo Kappa. Como vas a silenciar a ${user}?`;
};

const handleGreetings = (_arg: any, user: any) =>
  `Bienvenido al stream ${user}!!`;
const handleGoodBye = (_arg: any, user: any) =>
  `Muchas gracias por haber estado en el stream ${user}! Nos vemos la proxima`;

/*
!uptime
!hoy
!setup
!horarios
*/

const commandHandlers = {
  "!dice": handleDice,
  "!discord": handleDiscord,
  "!twitter": handleTwitter,
  "!devto": handleDevTo,
  "!instagram": handleInstagram,
  "!youtube": handleYouTube,
  "!tiktok": handleTikTok,
  "!silenciar": handleSilence,
  "!saludar": handleGreetings,
  "!adios": handleGoodBye,
  //"!uptime": handleUptime,
  // "!hoy": handleToday,
  // "!setup": handleSetups,
  // "!horarios": handleSchedule,
};

const registerEvent = (client: Client) => {
  const handler = (target: any, context: any, msg: any, self: any) => {
    if (self) {
      // Ignore messages from the bot
      return;
    }

    const commandName = msg.trim().split(" ")[0];

    const commandExists = Object.keys(commandHandlers).some(
      (command) => command === commandName,
    );

    if (!commandExists) {
      console.log(`* Unknown command ${commandName}`);
      // TODO: Register possible future command
      return;
    }

    const arg = msg.trim().replace(commandName, "");
    const { username } = context;

    //@ts-ignore
    const handler = commandHandlers[commandName];
    const result = handler(arg, username);
    client.say(target, result);
  };

  client.on("message", handler);
};
export default registerEvent;
