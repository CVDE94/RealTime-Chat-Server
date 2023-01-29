

const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    usuario:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    online:{
        type: Boolean,
        default: false
    },



});

module.exports = model('Usuario', UsuarioSchema);