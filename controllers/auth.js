const { response } = require("express")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");


const crearUsuario = async (req, res = response) => {

    const {email, usuario, password}= req.body;

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

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        crear_usuario.password = bcrypt.hashSync(password, salt);
        await crear_usuario.save();

        //Generar mi JWT
        const token = await generarJWT(crear_usuario.id);
    
        res.json({
            ok: true,
            crear_usuario,
            token
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