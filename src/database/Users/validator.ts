import * as Joi from 'joi';

export const createUserModel: Joi.ObjectSchema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    name: Joi.string().required(),
    phone: Joi.string().trim(),
    password: Joi.string().trim().required()
});

export const updateUserModel: Joi.ObjectSchema = Joi.object().keys({
    email: Joi.string().email().trim(),
    name: Joi.string(),
    phone: Joi.string().trim(),
    password: Joi.string().trim()
});

export const loginUserModel: Joi.ObjectSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required()
});

export const getUserModel: Joi.ObjectSchema = Joi.object().keys({
    id: Joi.string().trim().required()
});

export const jwtValidator: Joi.ObjectSchema = Joi.object({
    'authorization': Joi.string().required()
}).unknown();