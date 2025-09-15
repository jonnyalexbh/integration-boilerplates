# Express TypeScript Starter

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1+-red.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A professional boilerplate for REST APIs with Express.js and TypeScript, featuring data validation with Joi, robust error handling, and scalable project structure.

## 🚀 Features

- ✅ **TypeScript** - Static typing for better development experience
- ✅ **Express.js 5.x** - Fast and minimalist web framework
- ✅ **Joi Validation** - Robust input data validation
- ✅ **ESLint 9** - Modern linting with flat config
- ✅ **Prettier** - Consistent code formatting
- ✅ **Scalable Structure** - Clear folder and file organization
- ✅ **Custom Middleware** - Validation and error handling
- ✅ **Development Scripts** - Hot reload with nodemon
- ✅ **Health Check** - Monitoring endpoint
- ✅ **Complete CRUD** - Basic database operations

## 📁 Project Structure

```
03-express-ts-starter/
├── src/
│   ├── controllers/          # Route controllers
│   │   └── users.controller.ts
│   ├── middlewares/          # Custom middlewares
│   │   └── validation.middleware.ts
│   ├── schemas/              # Joi validation schemas
│   │   └── user.schema.ts
│   ├── types/                # TypeScript type definitions
│   │   └── common.type.ts
│   ├── services/             # Business logic
│   ├── utils/                # Utilities and helpers
│   ├── helpers/              # Helper functions
│   ├── app.ts                # Express configuration
│   ├── routes.ts             # Route definitions
│   └── server.ts             # Server entry point
├── .vscode/                  # VS Code settings
│   └── settings.json         # Editor configuration
├── dist/                     # Compiled code (generated)
├── scripts/                  # Automation scripts
├── eslint.config.js          # ESLint 9 configuration
├── .prettierrc               # Prettier configuration
├── .prettierignore           # Prettier ignore file
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 03-express-ts-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (optional)

   ```bash
   cp .env.example .env
   ```

4. **Run in development mode**
   ```bash
   npm run dev
   ```

## 🚀 Available Scripts

| Script              | Description                                 |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Run server in development mode with ts-node |
| `npm run dev:watch` | Run with nodemon for hot reload             |
| `npm run build`     | Compile TypeScript to JavaScript            |
| `npm start`         | Compile and run in production               |
| `npm run lint`      | Check for linting errors                    |
| `npm run lint:fix`  | Auto-fix linting errors                     |
| `npm run format`    | Format code with Prettier                   |
| `npm run format:check` | Check if code is formatted               |
| `npm run check`     | Run both lint and format checks             |

## 📚 API Endpoints

### Health Check

- **GET** `/health` - Check server status

### Users

- **GET** `/users` - Get all users
- **GET** `/users/:id` - Get user by ID
- **POST** `/users` - Create new user (with validation)
- **PUT** `/users/:id` - Update user
- **DELETE** `/users/:id` - Delete user

## 🔧 Usage Examples

### Create a user

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "age": 28
  }'
```

### Success response

```json
{
  "message": "User registered"
}
```

### Validation error response

```json
{
  "message": "Validation error",
  "errors": [
    "Body: Name must be at least 2 characters long",
    "Body: Please provide a valid email address"
  ]
}
```

## 🏗️ Development

### Adding new routes

1. **Create the controller** in `src/controllers/`
2. **Define validation schema** in `src/schemas/`
3. **Add the route** in `src/routes.ts`
4. **Apply validation middleware** if needed

### Example: Adding products endpoint

```typescript
// src/controllers/products.controller.ts
export const createProduct = (req: Request, res: Response) => {
  // Controller logic
};

// src/schemas/product.schema.ts
export const createProductSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
  }),
};

// src/routes.ts
app.post('/products', validateRequest(createProductSchema), createProduct);
```

## 🔒 Data Validation

The project uses **Joi** for robust data validation:

### Available schemas

- **createUserSchema**: Validation for creating users
- **updateUserSchema**: Validation for updating users
- **commonSchemas**: Reusable schemas (numeric ID, pagination, etc.)

### Validation features

- ✅ Data type validation
- ✅ Custom error messages
- ✅ Range and format validation
- ✅ Required and optional fields
- ✅ Email and password validation

## 🛠️ Code Quality & Development Tools

### ESLint 9 Configuration
- **Modern flat config** - Uses the new ESLint 9 configuration format
- **TypeScript support** - Full TypeScript integration with type-aware rules
- **Prettier integration** - Runs Prettier as an ESLint rule for consistent formatting
- **Node.js globals** - Properly configured for Node.js environment
- **Custom rules** - Optimized for Express.js and TypeScript development

### Prettier Configuration
- **Single quotes** - Consistent string formatting
- **90 character line width** - Optimal for modern screens
- **2-space indentation** - Standard JavaScript/TypeScript formatting
- **Trailing commas** - ES5 compatible trailing comma support
- **Semicolons** - Consistent statement termination

### VS Code Integration
- **Format on save** - Automatic code formatting
- **ESLint auto-fix** - Automatic linting error fixes
- **TypeScript preferences** - Optimized import paths
- **File handling** - Consistent line endings and whitespace

### Development Workflow
```bash
# Check code quality
npm run check

# Fix formatting and linting issues
npm run lint:fix
npm run format

# Development with hot reload
npm run dev:watch
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Production

1. **Compile the project**

   ```bash
   npm run build
   ```

2. **Run in production**
   ```bash
   npm start
   ```

### Docker (optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["npm", "start"]
```

## 📦 Dependencies

### Production

- **express**: Web framework for Node.js
- **joi**: Schema validation library

### Development

- **typescript**: TypeScript compiler
- **@types/express**: Type definitions for Express
- **@types/node**: Type definitions for Node.js
- **ts-node**: Run TypeScript directly
- **nodemon**: Automatic server restart
- **eslint**: Modern JavaScript/TypeScript linting
- **@eslint/js**: ESLint JavaScript configurations
- **@typescript-eslint/eslint-plugin**: TypeScript ESLint plugin
- **@typescript-eslint/parser**: TypeScript parser for ESLint
- **prettier**: Code formatter
- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier
- **eslint-plugin-prettier**: Runs Prettier as an ESLint rule

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

⭐ **If you like this project, give it a star!** ⭐
