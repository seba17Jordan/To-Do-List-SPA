import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';

export function createAccessToken(payload){ //payload son los datos que quiero guardar dentro del token
    return new Promise((resolve, reject) => { //esto es un objeto de node, es una promesa, puede ir mal (reject) o bien (resolve)
        jwt.sign(
            payload,
            TOKEN_SECRET, //llave o key para crear un token
            {
                expiresIn: "1d", //le pongo que expire en un día
            },
            (err, token) => { //esto es un callback para que sea asíncrono, me puede dar un error o el token
                if(err) reject(err);
                resolve(token);
                
            }
        );
    })
}

