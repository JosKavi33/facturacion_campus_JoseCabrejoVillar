import 'reflect-metadata';
import { Router } from "express";
import { validationResult } from "express-validator";
import { parametro } from '../dto/parametroDTO.js';

export const appMiddlewareParam = Router();


appMiddlewareParam.use(parametro, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const result = req;
    if (result.isEmpty()) return res.status(400).json({errors:errors.array()});
    next();
});
