import amqp from 'amqplib';
import { CONNECTION_STRING } from '../constants';

const EXCHANGE_NAME = 'topic_logs';
const ROUTING_KEY = 'user.created.email';
const MESSAGE = { userId: 123, text: 'New user created, email sent! 6' };

async function produce() {
  try {
    const connection = await amqp.connect(CONNECTION_STRING);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });

    channel.publish(
      EXCHANGE_NAME,
      ROUTING_KEY,
      Buffer.from(JSON.stringify(MESSAGE))
    );

    console.log(`✅ Sent to "${EXCHANGE_NAME}" with routing key "${ROUTING_KEY}":`, MESSAGE);

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (err) {
    console.error('❌ Producer error:', err);
  }
}

produce();
