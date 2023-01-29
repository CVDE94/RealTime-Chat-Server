/*

    path: api/login

*/

const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearUsuario } = require('../controllers/auth');
const { login } = require('../controllers/login');
const { renewToken } = require('../controllers/renew_token');

const router = Router();


router.post('/new',[
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min:5}),
    validarCampos,
] ,crearUsuario)


router.post('/',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min:5}),
    validarCampos,
], login)


router.get('/renew', validarJWT ,renewToken );

module.exports = router;