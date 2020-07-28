var User = require('../models/users');
var passport = require('passport');
var authenticate = require('../authenticate');

/**
 * Función que permite obtener todos los usuarios registrados en la base de datos
 * @param {*} req recibe una solicitud GET
 * @param {*} res me permite responder, statusCode: 200 y arreglo JSON con todos los usuarios registrados, esta acción
 * solo permite ser realizados por un usuario administrador 
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado, en caso de que no se encuentre usuarios registrados respondera con un
 * statusCode: 404 y un mensaje indicando esto. 
 */
exports.getUsuarios = (req, res, next) => {
    User.findOne({})
        .then((users) => {
            if (users != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(users);
            }
            else {
                err = new Error('No hay usuarios registrados!');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
};

/**
 * Función que permite registrar un usuario en la base de datos
 * @param {"username": "", "password": "", "nombre": "", "apellido": ""} req recibe un solicitud POST con el objeto JSON
 * indicado 
 * @param {*} res me permite responder, si se registra correctamen un statusCode: 200 y arreglo JSON con el usuario
 * registrado, de lo contrario respondera un statusCode: 500 y el error en formato JSON
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado
 */
exports.registrarUsuario = (req, res, next) => {
    User.register(new User({ username: req.body.username, nombre: req.body.nombre, apellido: req.body.apellido }), req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        }
        else {
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, status: 'Registro Exitoso!' });
            });
        }
    });
};

/**
 * Función que me permite loguear un usuario verificado su usuario y contraseña.
 * @param {"username": "", "password": ""} req recibe una solicitud POST con el JSON indicado.
 * @param {*} res si el usuario y la contraseña son correctas respondera con un statusCode: 200 y un objeto JSON con un
 * token que me permite identificarme como usuario logueado.
 */
exports.loginUsuario = (req, res) => {
    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'Bienvenido!' });
};