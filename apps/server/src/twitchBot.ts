import tmi from "tmi.js";

const getTwitchBotClient = () => {
  const { TWITCH_BOT_NAME, TWITCH_BOT_AUTH, TWITCH_CHANNELS } = process.env;

  return new tmi.Client({
    options: { debug: true },
    connection: {
      secure: true,
      reconnect: true,
    },
    identity: {
      username: TWITCH_BOT_NAME,
      password: TWITCH_BOT_AUTH,
    },
    channels: [TWITCH_CHANNELS as string],
  });
};
export default getTwitchBotClient;
