import express from "express";
import  {coneccion}  from "../db/atlas.js";

let db = await coneccion();
const pacientes = db.collection("pacientes");

export const getPacienteById = async (req, res, next) => {
    try {
        const id = parseInt(req.query.id);
        let result = await pacientes.aggregate([
            {
                $match:{"id_paciente":id}
            },
            {
                $project: {
                    "_id":0,
                    "patient_id" :"$id_paciente",
                    "complete_name" :"$nombre_completo",
                    "phoneNumber" :"$telefono",
                    "email_patient" :"$email",
                }
            }
        ]).toArray();
        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getPacientesAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await pacientes.aggregate([
            {
                $project: {
                    "_id":0,
                    "patient_id" :"$id_paciente",
                    "complete_name" :"$nombre_completo",
                    "phoneNumber" :"$telefono",
                    "email_patient" :"$email",
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};


