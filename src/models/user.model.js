import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true //quita espacios extra
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true //para que sea unico 
    }, 
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true //fecha de creacion y ultima modificacion
})

export default mongoose.model('User', userSchema)
