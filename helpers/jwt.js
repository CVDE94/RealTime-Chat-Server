const jwt = require("jsonwebtoken");

const generarJWT = (uuid) => {

    return new Promise ((resolve, reject)=> {

        const payload = {uuid};

        jwt.sign(payload,process.env.JWT_KEY,{
            expiresIn: '24h'
        }, (err, token)=> {

            if(err){
                // No se pudo crear el Token
                reject('No se pudo generar el JWT');
            } else {
                // TOKEN!!
                resolve(token);
            }
        })
    });
}

module.exports = {
    generarJWT
}