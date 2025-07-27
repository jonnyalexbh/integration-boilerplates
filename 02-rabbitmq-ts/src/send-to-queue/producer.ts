import amqp from 'amqplib';
import { QUEUE_NAME, CONNECTION_STRING } from './constants';

const message = { text: 'Hello from the producer!' };

async function produce() {
  try {
    const connection = await amqp.connect(CONNECTION_STRING);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));

    console.log(`✅ Message sent to "${QUEUE_NAME}":`, message);

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
