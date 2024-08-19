import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/merndb"); //merndb es el nombre de la db      
        console.log("DB connected");
    } catch (error) {
        console.log("ERROOOOOOOR");
        console.log(error);
    }
};