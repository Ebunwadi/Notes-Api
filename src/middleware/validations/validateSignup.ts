import Joi from '@hapi/joi';
import { NextFunction, Request, Response } from 'express'

const schema = Joi.object().keys({
  userName: Joi.string()
    .min(3)
    .max(50)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(4)
    .max(50)
    .required(),
  confirmPassword: Joi.string()
    .min(4)
    .max(50)
    .required(),
});

export const validateSignUp = async (req: Request, res: Response, next: NextFunction) => {
    await schema.validateAsync(req.body);
    next()
  
};
export default validateSignUp;
