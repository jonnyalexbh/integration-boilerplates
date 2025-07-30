import amqp from 'amqplib';
import { CONNECTION_STRING } from '../constants';

const EXCHANGE_NAME = 'topic_logs';
const QUEUE_NAME = 'email_queue';
const BINDING_KEY = 'user.created.email';

async function consume() {
  const connection = await amqp.connect(CONNECTION_STRING);
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });

  const q = await channel.assertQueue(QUEUE_NAME, { durable: true });

  await channel.bindQueue(q.queue, EXCHANGE_NAME, BINDING_KEY);

  console.log(`🟢 Waiting for messages with topic "${BINDING_KEY}"...`);

  channel.consume(q.queue, (msg) => {
    if (msg?.content) {
      console.log('📩 Received:', msg.content.toString());
      channel.ack(msg);
    }
  });
}

consume();
