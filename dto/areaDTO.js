import { check } from "express-validator";

export const GetAllAreas= [

    check("codigoArea")
    .notEmpty().withMessage("El campo codigoArea es Obligatorio")
    .isNumeric().withMessage("El campo codigoArea debe ser de tipo Numerico"),

    check("nombre")
    .notEmpty().withMessage("El campo nombre es Obligatorio")
    .isString().withMessage("El campo nombre debe ser de tipo String")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras")
]


