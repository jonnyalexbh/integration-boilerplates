import * as amqp from 'amqplib';

import { QUEUE_NAME, CONNECTION_STRING } from './constants';

async function consumeMessages() {
  const connection = await amqp.connect(CONNECTION_STRING);
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, { durable: true });

  console.log(`[⏳] Waiting for messages in "${QUEUE_NAME}"...`);

  channel.consume(QUEUE_NAME, (msg) => {
    if (msg) {
      console.log(`[📩] Received: ${msg.content.toString()}`);
      channel.ack(msg);
    }
  });
}

consumeMessages().catch(console.error);
