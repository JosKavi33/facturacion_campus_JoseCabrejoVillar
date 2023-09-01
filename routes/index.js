import { limitUsuario } from '../helpers/limit.js'
import passportHelper from '../helpers/passPortHelper.js'
import Routes from 'express';
import routesVersioning from 'express-routes-versioning';

//* Importacion de los Metodos para todas las Colecciones
import {getAreaById,getAreaAll,postArea,putArea,delArea} from '../apis/Version1/areaApi.js';

//* Importacion de los middleware de las Validaciones nativas de express
import { appMiddlewareDataArea , appMiddlewareParamArea } from '../middleware/areaMiddleware.js';


const appUser = Routes();
const appArea = Routes();

const version = routesVersioning();

// ? Headers 'Authorization: Bearer ....'
appUser.use(limitUsuario(), passportHelper.authenticate('bearer', {
    session: false
}));

// * Headers 'Accept-Version: 1.0.0' 
// ? Area
appArea.get('/:id?' , appMiddlewareParamArea ,version({
    "1.0.0": getAreaAll,
    "1.0.1": getAreaById 
}));
appArea.post('/', appMiddlewareDataArea, version({
    "1.0.0": postArea
}));
appArea.put('/:id?', appMiddlewareParamArea, appMiddlewareDataArea, version({
    "1.0.0": putArea
}));
appArea.delete('/:id?', appMiddlewareParamArea, version({
    "1.0.0": delArea
}));

//*Exportamos las apps hacia app.js en la parte principal del codigo
export {
    appUser,
    appArea
};