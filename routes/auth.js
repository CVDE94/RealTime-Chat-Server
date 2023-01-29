/*

    path: api/login

*/

const {Router} = require('express');
const { check } = require('express-validator');

const { crearUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/new',[
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min:5}),
    validarCampos,
] ,crearUsuario)




module.exports = router;