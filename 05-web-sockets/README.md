# WebSockets + TypeScript Starter

A clean, minimal boilerplate for building WebSocket servers with TypeScript. Perfect for real-time applications, chat systems, live updates, and gaming.

## 🚀 Features

- ✅ **TypeScript** - Static typing for better development experience
- ✅ **tsx** - Fast TypeScript execution with hot reload and ES module support
- ✅ **Modern Setup** - Clean project structure with optimized configuration
- ✅ **ES Modules** - Native ES module support with `"type": "module"`
- ✅ **Development Tools** - Fast iteration with automatic restarts

## 📁 Project Structure

```
05-web-sockets/
├── src/
│   └── app.ts              # Main application entry point
├── dist/                   # Compiled JavaScript output (auto-generated)
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup Steps

1. **Install TypeScript and dependencies**

   ```bash
   npm i -D typescript @types/node @types/ws tsx rimraf
   npm install ws
   ```

   What these packages do:
   - `typescript`: TypeScript compiler
   - `@types/node`: TypeScript definitions for Node.js
   - `@types/ws`: TypeScript definitions for WebSocket library
   - `tsx`: Fast TypeScript execution with hot reload and ES module support
   - `rimraf`: Cross-platform `rm -rf` for cleaning directories
   - `ws`: Lightweight WebSocket library

2. **Initialize TypeScript configuration**

   ```bash
   npx tsc --init --outDir dist/ --rootDir src
   ```

   You can customize the configuration to your preferences. The current setup includes:
   - Source and output directory configuration
   - Strict type checking
   - Modern ES modules support

3. **Create scripts for dev, build and start**

   Add these scripts to your `package.json`:

   ```json
   {
     "type": "module",
     "scripts": {
       "dev": "tsx watch src/app.ts",
       "build": "rimraf ./dist && tsc",
       "start": "npm run build && node dist/app.js"
     }
   }
   ```

   **Note**: Make sure to add `"type": "module"` to enable ES module support.

   **About tsx**: [Learn more here](https://github.com/esbuild-kit/tsx)

## 🚀 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run in development mode with hot reload using tsx |
| `npm run build` | Clean dist folder and compile TypeScript to JavaScript |
| `npm start` | Build and run in production mode |

### Script Details

- **`dev`**: Uses `tsx watch` which:
  - Automatically restarts on file changes
  - Supports ES modules natively
  - Runs directly from TypeScript source files (no compilation needed)
  - Fast execution with esbuild under the hood

- **`build`**: 
  - Removes old `dist/` directory using `rimraf`
  - Compiles TypeScript to JavaScript using `tsc`

- **`start`**: 
  - Builds the project first
  - Runs the compiled JavaScript from `dist/`

## 📚 Usage Examples

### Development Mode

```bash
npm run dev
```

This will start the server with hot reload. Any changes to `.ts` files will automatically restart the server.

### Production Mode

```bash
npm run build
npm start
```

Or use the combined command:

```bash
npm start
```

## 🔧 WebSocket Implementation

This project includes a basic WebSocket server implementation in `src/app.ts`.

### Current Implementation

The server (`src/app.ts`) includes:

- **WebSocket Server** running on port 3000
- **Connection handling** - Logs when clients connect
- **Message handling** - Receives and logs messages from clients
- **Error handling** - Logs WebSocket errors
- **Periodic messages** - Sends a message to connected clients every 2 seconds
- **Initial greeting** - Sends a welcome message when a client connects

```typescript
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
```

### Testing the WebSocket Server

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Connect using a WebSocket client**:
   - Browser console:
     ```javascript
     const ws = new WebSocket('ws://localhost:3000');
     ws.onmessage = (event) => console.log('Received:', event.data);
     ws.send('Hello from client!');
     ```
   - Or use a tool like [WebSocket King](https://websocketking.com/) or [Postman](https://www.postman.com/)

## 🎯 Use Cases

- **Real-time Chat Applications** - Instant messaging and group chats
- **Live Updates** - Real-time data synchronization
- **Gaming** - Multiplayer game servers
- **Collaborative Tools** - Real-time document editing
- **Notifications** - Push notifications to connected clients
- **Live Dashboards** - Real-time monitoring and analytics

## 📦 Dependencies

### Development Dependencies

- **typescript**: TypeScript compiler
- **@types/node**: TypeScript definitions for Node.js
- **@types/ws**: TypeScript definitions for WebSocket library
- **tsx**: Fast TypeScript execution with hot reload and ES module support
- **rimraf**: Cross-platform `rm -rf` for cleaning directories

### Production Dependencies

- **ws**: Lightweight WebSocket library

## 🔗 Resources

- [tsx Documentation](https://github.com/esbuild-kit/tsx)
- [WebSocket API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [ws Library](https://github.com/websockets/ws)

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

⭐ **If you like this project, give it a star!** ⭐
