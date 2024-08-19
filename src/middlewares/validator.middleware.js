export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body) //el metodo parse se encarga de validar
        next()    
    } catch (error) {
        return res.status(400).json(error.errors.map(error => error.message)) //error tienen una propiedad errors, y ésta tiene una message, nos interesa el mansaje de cada error
    }
    
}