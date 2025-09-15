import { Request, Response } from 'express';

const USERS = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 25 },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', age: 26 },
];

export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json(USERS);
};

export const getUserById = (req: Request, res: Response) => {
  const user = USERS.find(user => user.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

export const createUser = (req: Request, res: Response) => {
  res.status(200).json({ message: 'User registered' });
};

export const updateUser = (req: Request, res: Response) => {
  res.status(200).json({ message: 'User updated' });
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json({ message: 'User deleted' });
};
