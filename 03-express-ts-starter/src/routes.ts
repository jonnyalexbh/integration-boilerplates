import { Application, Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from './controllers/users.controller';
import { validateRequest } from './middlewares/validation.middleware';
import { createUserSchema } from './schemas/user.schema';

const routes = (app: Application) => {
  app.get('/health', (_: Request, res: Response) =>
    res.status(200).json({ uptime: process.uptime() })
  );

  app.get('/users', getAllUsers);
  app.get('/users/:id', getUserById);
  app.post('/users', validateRequest(createUserSchema), createUser);
  app.put('/users/:id', updateUser);
  app.delete('/users/:id', deleteUser);
};

export default routes;
