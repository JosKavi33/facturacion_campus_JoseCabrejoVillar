import express from "express";
import  {coneccion}  from "../db/atlas.js";

let db = await coneccion();
const vendedores = db.collection("vendedores");

export const getVendedorById = async (req, res, next) => {
    try {
        const id = parseInt(req.query.id);
        let result = await vendedores.aggregate([
            {
                $match:{"id_seller":id}
            },
            {
                $project: {
                    "_id":0,
                    "sellerr_id" :"$id_vendedor",
                    "complete_name" :"$nombre_completo",
                    "phoneNumber" :"$telefono",
                    "email_seller" :"$email",
                }
            }
        ]).toArray();
        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getVendedoresAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await vendedores.aggregate([
            {
                $project: {
                    "_id":0,
                    "sellerr_id" :"$id_vendedor",
                    "complete_name" :"$nombre_completo",
                    "phoneNumber" :"$telefono",
                    "email_seller" :"$email",
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};


