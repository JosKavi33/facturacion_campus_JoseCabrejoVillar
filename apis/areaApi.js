import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let area = db.collection("area");
export const getAreaById = async (req, res, next) => {
    try {
        const id = parseInt(req.query.id);
        let result = await area.aggregate([
            {
                $match: { "id_area": id } 
            },
            {
                $project: {
                    "_id": 0,
                    "codigoArea": "$id_area",
                    "nombre": "$nombre_area",
                }
            }
        ]).toArray();
        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getAreaAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await area.aggregate([
            {
                $project: {
                    "_id": 0,
                    "codigoArea": "$id_area",
                    "nombre": "$nombre_area",
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const postArea = async(req, res)=>{
    try{
        console.log(req.body);
        let result = await area.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        console.log(error);
        }
};
export const putArea = async (req, res)=>{
    try{
        const id = parseInt(req.query.id);
        let result = await area.updateOne(
            { "id_area": id},
            { $set: req.body }
        );
        res.send(result)
    } catch (error){
        res.status(422).send(error)
    }
};
export const delArea = async (req, res)=>{
    try{
        const id = parseInt(req.query.id);
        let result = await area.deleteOne(
            { "id_area": id }
        );
        res.status(200).send(result)
    } catch (error){
        res.status(422).send(error)
    }
}

