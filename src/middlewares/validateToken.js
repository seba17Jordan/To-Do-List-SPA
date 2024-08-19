import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => { //el next es para que continúe, le diré que si hay un token que siga
    //const token = req.headers.cookie //el token viene en el header del GET (o sea del request), y esta en la cookie. Pero abajo esta mejor escrito
    const { token } = req.cookies;
    if(!token) return res.status(401).json({ message: "No token, authorization denied"}); //si el que intenta pedir info no tiene bien las cookies del login
    
    jwt.verify(token, TOKEN_SECRET, (err, user) => { //si el token conincide entonces debo validarlo, esto puede darme un error o puede darme el usuario
        if(err) return res.status(403).json({ message: "Invalid token" });
        
        req.user = user //del usuario que estoy decodificando, voy a guardar todo en req user, eso es la peticion
        next()
    });
}