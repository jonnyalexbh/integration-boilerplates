# 06-performance

A simple Express.js application boilerplate for performance testing and debugging with Chrome DevTools.

## Features

- Express.js server with basic routes
- Chrome DevTools debugging support
- Health check endpoint
- Simple API structure

## Installation

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

The server will start on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

## Debugging with Chrome DevTools

This project includes Node.js inspector support for debugging with Chrome DevTools.

### Steps to Debug:

1. **Start the application in debug mode:**
   ```bash
   npm run debug
   ```

2. **Open Chrome DevTools:**
   - Open Google Chrome
   - Navigate to `chrome://inspect` in the address bar
   - You should see your Node.js process listed under "Remote Target"

3. **Start debugging:**
   - Click "inspect" next to your Node.js process
   - The Chrome DevTools will open with debugging capabilities
   - You can set breakpoints, inspect variables, and step through your code

### Alternative: Using VS Code Debugger

You can also debug directly in VS Code by creating a `.vscode/launch.json` configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug App",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/app.js",
      "runtimeArgs": ["--inspect"]
    }
  ]
}
```

## Available Scripts

- `npm run start:dev` - Start the application in development mode
- `npm run debug` - Start the application with Node.js inspector enabled for Chrome DevTools debugging

## API Endpoints

- `GET /` - Returns a welcome message with timestamp
- `GET /health` - Health check endpoint

## Environment Variables

- `PORT` - Server port (default: 3000)

## Dependencies

- `express` - Web framework for Node.js

