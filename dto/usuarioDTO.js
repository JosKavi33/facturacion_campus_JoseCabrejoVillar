import { check } from "express-validator";

export const ValidatedUsuario= [

    check("nombre")
    .notEmpty().withMessage("El campo nombre es Obligatorio")
    .isString().withMessage("El campo nombre debe ser de tipo String")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),

    check("password")
    .notEmpty().withMessage("El campo password es Obligatorio")
    .isString().withMessage("El campo password debe ser de tipo String")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras")
]

