import Joi from '@hapi/joi';
import { NextFunction, Request, Response } from 'express'


const noteSchema = Joi.object().keys({
  title: Joi.string().max(50).required(),
  text: Joi.string().max(2500).required(),
});

export const validateNotes = async (req: Request, res: Response, next: NextFunction) => {
    await noteSchema.validateAsync(req.body);
    next()
  
};
