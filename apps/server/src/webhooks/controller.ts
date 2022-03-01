import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import crypto from 'crypto';

type TwitchRequest = FastifyRequest<{
  Headers: {
    'Twitch-Eventsub-Message-Type': string;
    'Twitch-eventsub-message-timestamp': number;
    'Twitch-eventsub-message-id': string;
  };
  Body: {
    challenge: string;
    event: {
      broadcaster_user_name: string;
    };
    subscription: {
      type: string;
    };
  };
}>;

const verifyTwitchSignature = (req: TwitchRequest) => {
  const { TWITCH_SIGNING_SECRET } = process.env;

  const messageId = req.headers['Twitch-eventsub-message-id'];
  const timestamp = req.headers['Twitch-eventsub-message-timestamp'];
  const messageSignature = req.headers['Twitch-eventsub-message-signature'];

  const time = Math.floor(new Date().getTime() / 1000);
  console.log(`Message ${messageId} Signature: `, messageSignature);

  if (Math.abs(time - timestamp) > 600) {
    // needs to be < 10 minutes
    console.log(
      `Verification Failed: timestamp > 10 minutes. Message Id: ${messageId}.`,
    );
    throw new Error('Ignore this request.');
  }

  if (!TWITCH_SIGNING_SECRET) {
    console.log(`Twitch signing secret is empty.`);
    throw new Error('Twitch signing secret is empty.');
  }

  const body = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', TWITCH_SIGNING_SECRET);
  const data = hmac.update(messageId + timestamp + body);
  const computedSignature = `sha256=${data.digest('hex')}`;

  console.log(`Message ${messageId} Computed Signature: `, computedSignature);

  if (messageSignature !== computedSignature) {
    throw new Error('Invalid signature.');
  }

  console.log('Verification successful');
  return true;
};

export async function post(
  this: FastifyInstance,
  req: TwitchRequest,
  reply: FastifyReply,
) {
  const valid = verifyTwitchSignature(req);
  if (!valid) {
    return reply.status(403).send();
  }

  const messageType = req.headers['Twitch-Eventsub-Message-Type'];
  if (messageType === 'webhook_callback_verification') {
    console.log('Verifying Webhook');
    return reply.status(200).send(req.body.challenge);
  }

  const { type } = req.body.subscription;
  const { event } = req.body;

  console.log(
    `Receiving ${type} request for ${event.broadcaster_user_name}: `,
    event,
  );

  return reply.status(200).send();
}
