import express from "express";
import  {coneccion}  from "../db/atlas.js";

let db = await coneccion();
const proveedores = db.collection("proveedores");

export const getProveedorById = async (req, res, next) => {
    try {
        const id = parseInt(req.query.id);
        let result = await proveedores.aggregate([
            {
                $match:{"id_proveedor":id}
            },
            {
                $project: {
                    "_id":0,
                    "supplier_id" :"$id_proveedor",
                    "pharmaceutic" :"$farmaceutica",
                    "complete_name" :"$nombre_completo",
                    "phoneNumber" :"$telefono",
                    "email_supplier" :"$email",
                }
            }
        ]).toArray();
        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getProveedoresAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await proveedores.aggregate([
            {
                $project: {
                    "_id":0,
                    "supplier_id" :"$id_proveedor",
                    "pharmaceutic" :"$farmaceutica",
                    "complete_name" :"$nombre_completo",
                    "phoneNumber" :"$telefono",
                    "email_supplier" :"$email",
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};


