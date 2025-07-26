# 🐇 RabbitMQ + TypeScript Starter

A clean, minimal example of **RabbitMQ** with **TypeScript** demonstrating message queue basics. Perfect for learning event-driven architectures or microservices communication.

---

## 🏗️ Project Structure

```sh
rabbitmq-ts/
├── src/
│   ├── producer.ts         # Publishes messages to a RabbitMQ queue
│   └── consumer.ts         # Consumes and processes messages
├── dist/                   # Compiled JS (auto-generated)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
└── README.md               # You're here!  
```

⚙️ Prerequisites
   Make sure you have the following installed:
- Node.js
- Docker (for running RabbitMQ locally)
- RabbitMQ Docker image

You can start a local RabbitMQ instance with:

```sh
docker run -d --name rabbitmq  -p 5672:5672 -p 15672:15672 rabbitmq:3-management
  
http://localhost:15672
Usuario: guest
Contraseña: guest
```

## 🚀 Setup Instructions

1. Initialize the project `npm init -y`
-  Install Dependencies

```sh
# RabbitMQ client library
npm install amqplib

# TypeScript and development dependencies
npm install --save-dev typescript ts-node @types/node

```

- Initialize TypeScript `npx tsc --init`
- Then update your tsconfig.json with the following recommended configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```
