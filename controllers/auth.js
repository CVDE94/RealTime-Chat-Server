const { response } = require("express")
const { validationResult } = require("express-validator")

const Usuario = require("../models/usuario");


const crearUsuario = async (req, res = response) => {

    const {email, usuario}= req.body;

    try {
        const existEmail = await Usuario.findOne({email});
        const existUsuario = await Usuario.findOne({usuario});

        if(existUsuario){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya existe'
            });
        } else if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya existente'
            });
        }

        const crear_usuario = new Usuario( req.body);
        await crear_usuario.save();
    
        res.json({
            ok: true,
            crear_usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}


module.exports = {
    crearUsuario
}