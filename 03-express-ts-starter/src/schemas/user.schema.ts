import Joi from 'joi';

export const createUserSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name must not exceed 50 characters',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).max(100).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must not exceed 100 characters',
      'any.required': 'Password is required',
    }),
    age: Joi.number().integer().min(13).max(120).optional().messages({
      'number.min': 'Age must be at least 13',
      'number.max': 'Age must not exceed 120',
      'number.integer': 'Age must be a whole number',
    }),
  }),
};
