import dotenv from 'dotenv';
import express from 'express';
import { appMedicamento, appCompras, appPacientes,
    appProveedores, appRecetas, appVendedores,appVentas } from './routes/index.js';
import { jwtVerify } from 'jose';
import {crearToken} from './helpers/JWT.js'

dotenv.config();
let app = express();
app.use(express.json());

app.use("/login", crearToken)

app.use("/medicamentos", appMedicamento);
app.use("/compras", appMedicamento);
app.use("/pacientes", appMedicamento);
app.use("/proveedores", appMedicamento);
app.use("/recetas", appMedicamento);
app.use("/vendedores", appMedicamento);
app.use("/ventas", appMedicamento);

let config = JSON.parse(process.env.MY_SERVER);
console.log(config);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});