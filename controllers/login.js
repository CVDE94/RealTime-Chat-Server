const { response } = require("express")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");


const login = async (req, res = response) => {
    const { email, password} = req.body;

    try {
        const usuarioDB = await Usuario.findOne({email});
        if( !usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o Password invalidos'
            });
        }
        // Validar el password
        
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if( !validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o Password invalidos'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }

}


module.exports = {
    login
}