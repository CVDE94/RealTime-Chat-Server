const { response } = require("express")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");


const renewToken = async (req, res = response) => {

    const uuid = req.uuid;
    const token = await generarJWT (uuid);
    const usuario = await Usuario.findById(uuid);
    
    res.json({
        ok: true,
        usuario,
        token
    });
}


module.exports = {
    renewToken
}