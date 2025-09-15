import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ValidationSchema } from '../types/common.type';

export const validateRequest = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];

    if (!req.body || Object.keys(req.body).length === 0) {
      errors.push('Body: request body cannot be empty');
    }

    if (schema.body) {
      const { error } = schema.body.validate(req.body);
      if (error) {
        errors.push(`Body: ${error.details.map(detail => detail.message).join(', ')}`);
      }
    }

    if (schema.params) {
      const { error } = schema.params.validate(req.params);
      if (error) {
        errors.push(`Params: ${error.details.map(detail => detail.message).join(', ')}`);
      }
    }

    if (schema.query) {
      const { error } = schema.query.validate(req.query);
      if (error) {
        errors.push(`Query: ${error.details.map(detail => detail.message).join(', ')}`);
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        message: 'Validation error',
        errors: errors,
      });
      return;
    }

    next();
  };
};

export const validateBody = (schema: Joi.ObjectSchema) => {
  return validateRequest({ body: schema });
};

export const validateParams = (schema: Joi.ObjectSchema) => {
  return validateRequest({ params: schema });
};

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return validateRequest({ query: schema });
};
