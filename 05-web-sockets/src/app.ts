import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', (message: Buffer) => {
    console.log('received: %s', message);
  });

  ws.send('Hello from the server');

  setInterval(() => {
    ws.send('Hello from the server every 2 seconds');
  }, 2000);
});

console.log('WebSocket server running on ws://localhost:3000');
