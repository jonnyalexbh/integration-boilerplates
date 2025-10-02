import { Application } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from './controllers/users.controller';
import { validateRequest } from './middlewares/validation.middleware';
import { createUserSchema } from './schemas/user.schema';
import { healthCheck } from './controllers/health.controller';

const routes = (app: Application) => {
  app.get('/health', healthCheck);

  app.get('/users', getAllUsers);
  app.get('/users/:id', getUserById);
  app.post('/users', validateRequest(createUserSchema), createUser);
  app.put('/users/:id', updateUser);
  app.delete('/users/:id', deleteUser);
};

export default routes;
