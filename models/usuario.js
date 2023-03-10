

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

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password,online, ...object} = this.toObject();
    object.uuid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);