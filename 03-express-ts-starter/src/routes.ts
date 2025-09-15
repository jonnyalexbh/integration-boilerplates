import { Application, Request, Response } from 'express';

const routes = (app: Application) => {
  app.get('/health', (_: Request, res: Response) => res.status(200).json({ message: 'Ok' }));
}

export default routes;
