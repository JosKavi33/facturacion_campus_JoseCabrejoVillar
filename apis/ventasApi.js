import express from "express";
import  {coneccion}  from "../db/atlas.js";

let db = await coneccion();
const ventas = db.collection("ventas");

export const getVentasById = async (req, res, next) => {
    try {
        const id = parseInt(req.query.id);
        let result = await ventas.aggregate([
            {
                $match:{"id_venta":id}
            },
            {
                $project: {
                    "_id":0,
                    "sale_id" :"$id_venta",
                    "sale_date" :"$fecha_venta",
                    "supplier" :"$proveedor",
                    "medicine" :"$medicamento",
                    "amount" :"$cantidad"
                }
            }
        ]).toArray();
        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getVentasAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await ventas.aggregate([
            {
                $project: {
                    "_id":0,
                    "sale_id" :"$id_venta",
                    "sale_date" :"$fecha_venta",
                    "supplier" :"$proveedor",
                    "medicine" :"$medicamento",
                    "amount" :"$cantidad"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
