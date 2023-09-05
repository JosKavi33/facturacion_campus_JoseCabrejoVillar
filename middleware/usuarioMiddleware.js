import { Router } from "express";
import { ValidatedUsuario } from "../dto/usuarioDTO.js";
import { validationResult } from "express-validator";
import { parametro } from '../dto/parametroDTO.js';


export const appMiddlewareDataUsuario = Router();
export const appMiddlewareParamUsuario = Router();


appMiddlewareDataUsuario.use(ValidatedUsuario, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    let {name : nombre, contraseña: password} = req.body;
    req.body = {nombre, password};
    next();
});

appMiddlewareParamUsuario.use(parametro, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const result = req;
    if (result.isEmpty()) return res.status(400).json({errors:errors.array()});
    next();
});
