# Node.js + TypeScript Starter Guide

This guide helps you set up a basic Node.js project using TypeScript, including configuration and a sample file to get you started.

📦 1. Initialize the Project

```sh
mkdir 01-node-ts
cd 01-node-ts
npm init -y
```

📚 2. Install TypeScript and Node.js Type Definitions

```sh
npm install --save-dev typescript ts-node @types/node
```

What these packages do:

- `typescript`: TypeScript compiler
- `ts-node`: Run `.ts` files directly without compiling to `.js`
- `@types/node`: Type definitions for Node.js core modules


⚙️ 3. Create the TypeScript Configuration File

Generate tsconfig.json:

```sh
npx tsc --init
```

Then replace its contents with this recommended setup:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

✍️ 4. Create Your First .ts File

Create the src folder and a basic entry file:

```json
mkdir src
touch src/index.ts
```

Contents of src/index.ts:

```typeScript
const message: string = 'Hello from TypeScript with Node.js!';
console.log(message);
```

🛠️ Bonus: Compile the Project to JavaScript


If you prefer to transpile the code to .js instead of running it with ts-node:

```typeScript
npx tsc
```

This will generate the output in the dist/ directory based on your tsconfig.json.

Then run it using Node:

```typeScript
node dist/index.js
```
