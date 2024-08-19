import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const {email, password, username} = req.body
    
   try {
    
    const userFound = await User.findOne({email});

    if(userFound) return res.status(400).json(["The email already exists"]);

    const passwordHash = await bcrypt.hash(password,10)
    const newUser = new User({
        username,
        email,
        password: passwordHash
    })
    const userSaved = await newUser.save() //guarda usuario en base de datos
    const token = await createAccessToken({id: userSaved._id}) //creo el token

    res.cookie('token', token, { 
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 9999999)
    });
    res.json({ //aca solo mando los datos que voy a usar en el frontend
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt
    })
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
};

export const login = async (req, res) => {
    const {email, password} = req.body
    
   try {
    const userFound = await User.findOne({email}) //busco si existe el usuario
    if(!userFound) return res.status(400).json({message: "User not found"});

    const isMatch = await bcrypt.compare(password, userFound.password); //comparo la contraseña puesta con la de la bd
    if(!isMatch) return res.status(400).json({message: "Incorrect password"});

    const token = await createAccessToken({id: userFound._id}) //creo el token ahora con el user encontrado

    //De acá para abajo es igual al register
    res.cookie('token', token, { 
        httpOnly: false,//process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "None",
    });//{httpOnly: true,sameSite: 'None',secure: false}

    //console.log(req.cookie); //esta es la cookie que envio al front
    
    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
        token: token
    })
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id) //esto es asincrono

    if (!userFound) return res.status(400).json({ message: "User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}

export const verifyToken = async (req, res) => { //Esta peticion se hace cada vez que la pafina carga por primera vez
    const { token } = req.cookies;

    if(!token) return res.status(401).json({message: "Unauthorized"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "Unauthorized"});

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({message: "Unauthorized"});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    });
}