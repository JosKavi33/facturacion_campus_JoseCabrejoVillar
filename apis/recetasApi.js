import express from "express";
import  {coneccion}  from "../db/atlas.js";

let db = await coneccion();
const recetas = db.collection("recetas");

export const getRecetasById = async (req, res, next) => {
    try {
        const id = parseInt(req.query.id);
        let result = await recetas.aggregate([
            {
                $match:{"id_receta":id}
            },
            {
                $project: {
                    "_id":0,
                    "recipe_id" :"$id_receta",
                    "recipe_date" :"$fechaEmision_receta",
                    "recipe_doctor" :"$nombreDr_receta",
                    "recipe_patient" :"$nombrePaciente_receta",
                    "recipe_medicine" :"$medicamento_receta"
                }
            }
        ]).toArray();
        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getRecetasAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await recetas.aggregate([
            {
                $project: {
                    "_id":0,
                    "recipe_id" :"$id_receta",
                    "recipe_date" :"$fechaEmision_receta",
                    "recipe_doctor" :"$nombreDr_receta",
                    "recipe_patient" :"$nombrePaciente_receta",
                    "recipe_medicine" :"$medicamento_receta"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
