import express from "express";
import  {coneccion}  from "../db/atlas.js";

let db = await coneccion();
const compras = db.collection("compras");

export const getComprasById = async (req, res, next) => {
    try {
        const id = parseInt(req.query.id);
        let result = await compras.aggregate([
            {
                $match:{"id_compra":id}
            },
            {
                $project: {
                    "_id":0,
                    "buys_id" :"$id_compra",
                    "buys_date" :"$fecha_compra",
                    "seller" :"$vendedor",
                    "patient" :"$paciente",
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
export const getComprasAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await compras.aggregate([
            {
                $project: {
                    "_id":0,
                    "buys_id" :"$id_compra",
                    "buys_date" :"$fecha_compra",
                    "seller" :"$vendedor",
                    "patient" :"$paciente",
                    "medicine" :"$medicamento",
                    "amount" :"$cantidad"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
