const { response } = require("express")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");


const renewToken = async (req, res = response) => {
    
    res.json({
        ok: true,
        uuid: req.uuid
    });
}


module.exports = {
    renewToken
}