import { limitUsuario } from '../helpers/limit.js'
import passportHelper from '../helpers/passPortHelper.js'
import Routes from 'express';
import routesVersioning from 'express-routes-versioning';
import { getMedicamentosAll, getMedicamentoById } from '../apis/medicamentosApi.js';
import { getProveedorById, getProveedoresAll } from '../apis/proveedoresApi.js';
import { getVendedorById, getVendedoresAll } from '../apis/vendedoresApi.js';
import { getPacienteById, getPacientesAll } from '../apis/pacientesApi.js';
import { getVentasAll, getVentasById } from '../apis/ventasApi.js';
import { getComprasAll, getComprasById } from '../apis/comprasApi.js';
import { getRecetasAll, getRecetasById } from '../apis/recetasApi.js';
import { appMiddlewareParamUsuario } from '../middleware/usuarioMiddleware.js';

const version = routesVersioning();
const appUser = Routes();
const appMedicamento= Routes();
const appVentas= Routes();
const appCompras= Routes();
const appRecetas= Routes();
const appPacientes= Routes();
const appVendedores= Routes();
const appProveedores= Routes();

appUser.use(limitUsuario(), passportHelper.authenticate('bearer', {
    session: false
}));
appMedicamento.get('/:id?', appMiddlewareParam ,version({
    "1.0.0": getMedicamentosAll,
    "1.0.1": getMedicamentoById
}));
appProveedores.get('/:id?', appMiddlewareParam ,version({
    "1.0.0": getProveedoresAll,
    "1.0.1": getProveedorById
}));
appVentas.get('/:id?', appMiddlewareParam ,version({
    "1.0.0": getVentasAll,
    "1.0.1": getVentasById
}));
appCompras.get('/:id?', appMiddlewareParam ,version({
    "1.0.0": getComprasAll,
    "1.0.1": getComprasById
}));
appRecetas.get('/:id?', appMiddlewareParam ,version({
    "1.0.0": getRecetasAll,
    "1.0.1": getRecetasById
}));
appPacientes.get('/:id?', appMiddlewareParam ,version({
    "1.0.0": getPacientesAll,
    "1.0.1": getPacienteById
}));
appVendedores.get('/:id?', appMiddlewareParam ,version({
    "1.0.0": getVendedoresAll,
    "1.0.1": getVendedorById
}));

export {
    appMedicamento,
    appUser,
    appVentas,
    appCompras,
    appRecetas,
    appPacientes,
    appVendedores,
    appProveedores
};