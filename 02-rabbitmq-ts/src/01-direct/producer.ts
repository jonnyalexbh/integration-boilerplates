import amqp from 'amqplib';
import { CONNECTION_STRING } from '../constants';

const EXCHANGE_NAME = 'direct_logs';
const ROUTING_KEY = 'info';
const MESSAGE = { text: 'Hello from the direct exchange producer!' };

async function produce() {
  try {
    const connection = await amqp.connect(CONNECTION_STRING);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });

    channel.publish(
      EXCHANGE_NAME,
      ROUTING_KEY,
      Buffer.from(JSON.stringify(MESSAGE))
    );

    console.log(`✅ Message sent to "${EXCHANGE_NAME}" with routing key "${ROUTING_KEY}":`, MESSAGE);

    setTimeout(() => {
      console.warn('closing channel & connection');
      channel.close();
      connection.close();
    }, 500);

  } catch (err) {
    console.error('❌ Producer error:', err);
  }
}

produce();
