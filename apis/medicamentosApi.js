import express from "express";
import  {coneccion}  from "../db/atlas.js";

let db = await coneccion();
const medicamentos = db.collection("medicamentos");

export const getMedicamentoById = async (req, res, next) => {
    try {
        const id = parseInt(req.query.id);
        let result = await medicamentos.aggregate([
            {
                $match:{"id_medicamento":id}
            },
            {
                $project: {
                    "_id":0,
                    "medicine_id" :"$id_medicamento",
                    "medicine" :"$nombre",
                    "amount" :"$cantidad",
                    "price" :"$precio",
                    "expiration_date" :"$fecha_expiracion",
                    "supplier" :"$proveedor"
                }
            }
        ]).toArray();
        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getMedicamentoByMenorCincuenta = async (req, res, next) => {
    try {
        let result = await medicamentos.aggregate([
            {
                $match:{"cantidad": {$lt:50}}
            },
            {
                $project: {
                    "_id":0,
                    "medicine_id" :"$id_medicamento",
                    "medicine" :"$nombre",
                    "amount" :"$cantidad",
                    "price" :"$precio",
                    "expiration_date" :"$fecha_expiracion",
                    "supplier" :"$proveedor"
                }
            }
        ]).toArray();
        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getMedicamentosAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await medicamentos.aggregate([
            {
                $project: {
                    "_id":0,
                    "medicine_id" :"$id_medicamento",
                    "medicine" :"$nombre",
                    "amount" :"$cantidad",
                    "price" :"$precio",
                    "expiration_date" :"$fecha_expiracion",
                    "supplier" :"$proveedor"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const getMedicamentoByProveedor = async (req, res, next) => {
    try {
        let result = await medicamentos.aggregate([
            {
                $lookup: {
                    "from": "proveedores",
                    "localField": "proveedor",
                    "foreignField": "id_proveedor",
                    "as": "proveedorFK"
                }
            },
            {
                $project: {
                    "_id":0,
                    "medicine_id" :"$id_medicamento",
                    "medicine" :"$nombre",
                    "amount" :"$cantidad",
                    "price" :"$precio",
                    "expiration_date" :"$fecha_expiracion",
                    "supplier" :"$proveedorFK"
                }
            }
        ]).toArray();
        res.send(result); 

    } catch (error) {
        next(error);
    }
};

