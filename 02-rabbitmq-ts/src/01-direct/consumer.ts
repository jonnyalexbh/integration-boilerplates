import amqp from 'amqplib';
import { CONNECTION_STRING } from '../constants';

const EXCHANGE_NAME = 'direct_logs';
const QUEUE_NAME = 'logs_info_queue';
const ROUTING_KEY = 'info';

async function consume() {
  try {
    const connection = await amqp.connect(CONNECTION_STRING);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });

    const q = await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.bindQueue(q.queue, EXCHANGE_NAME, ROUTING_KEY);

    console.log(`🟢 Waiting for messages in ${q.queue} with routing key "${ROUTING_KEY}"...`);

    channel.consume(q.queue, (msg) => {
      if (msg?.content) {
        console.log('📩 Received:', msg.content.toString());
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error('❌ Consumer error:', err);
  }
}

consume();
