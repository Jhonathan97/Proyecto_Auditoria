const mongoose = require('mongoose');
const Auditorias = require('../models/auditorias');
const { populate } = require('../models/auditorias');

/**
 * Función que permite obtener las auditorías relacionadas con el usuario ya sea lider auditor o miembro de alguna
 * auditoría.
 * @param {*} req recibe la solicitud GET en donde se puede acceder al _id del usuario después de verificar que el usuario
 * esta autenticado. 
 * @param {*} res me permite responder, statusCode: 200 y un arrayJSON con la auditorías, si encuentra por lo menos una
 * auditoría asociada.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado
 */
exports.getAuditorias = (req, res, next) => {
    Auditorias.find({ $or: [{ lider_auditor: req.user._id }, { miembros_equipo: { _id: req.user._id } }] })
        .then((auditorias) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(auditorias);
        }, (err) => next(err))
        .catch((err) => next(err));
};

/**
 * Función que permite crear una auditoria relacionandola con la persona que esta logueada en el sistema.
 * @param {"nombre": "", "nombre_clientes":[{"nombre": "","apellido": ""}], "miembros_equipo":[]} req recibe la
 * solicitud POST con el JSON indicado, en donde se puede acceder al _id del usuario después de verificar que el usuario
 * esta autenticado, los miembros del equipo son opcionales ya que no es obligatorio conformar un equipo auditor.
 * @param {*} res Si la creación fue exitosa, responde con un statusCode: 200 con el objeto JSON de la auditoría y su
 * lider_auditor asociado al auditor que esta creando la auditoría.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado.
 */
exports.crearAuditoria = (req, res, next) => {
    req.body.lider_auditor = req.user._id;
    Auditorias.create(req.body)
        .then((auditoria) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(auditoria);
        }, (err) => next(err))
        .catch((err) => next(err));
};

/**
 * Función que permite obtener un auditoría por medio de su ID.
 * @param {*} req se recibe la solicitud GET con el ID de la auditoría, en donde se puede acceder al _id del usuario
 * después de verificar que el usuario esta autenticado.
 * @param {*} res me permite responder, statusCode: 200 con un objeto JSON de la auditoría solo si esta asociada al
 * auditor que intenta obtenerla.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado, en caso de que no se encuentre la auditoría o no este asociada respondera con
 * un statusCode: 404 y un mensaje indicando esto. 
 */
exports.getAuditoria = (req, res, next) => {
    Auditorias.findOne({
        _id: req.params.auditoriaId,
        $or: [
            { lider_auditor: req.user._id },
            { miembros_equipo: { _id: req.user._id } }
        ]
    })
        .then((auditoria) => {
            if (auditoria != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(auditoria);
            }
            else {
                err = new Error('La auditoría con el ID: ' + req.params.auditoriaId + ' no existe o no pertenece a sus auditorías!');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
};

/**
 * Función que permite editar un auditoría por medio de su ID.
 * @param {"nombre": "", "nombre_clientes:[{"nombre": "", "apellido": ""}]} req se recibe la solicitud PUT con el ID de la
 * auditoría y el JSON indicado, en donde se puede acceder al _id del usuario después de verificar que el usuario esta
 * autenticado, solo el lider auditor asociado a la auditoría puede modificarla. 
 * @param {*} res me permite responder, statusCode: 200 con un objeto JSON de la auditoría modificada, esta acción solo
 * permite ser realizada si es un lider_auditor de la auditoría.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado, en caso de que no se encuentre la auditoría o no sea lider auditor de la
 * auditoría respondera con un statusCode: 404 y un mensaje indicando esto. 
 */
exports.editarAuditoria = (req, res, next) => {
    Auditorias.findOneAndUpdate(
        { _id: req.params.auditoriaId, lider_auditor: req.user._id },
        { $set: req.body },
        { new: true }
    )
        .then((auditoria) => {
            if (auditoria != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(auditoria);
            }
            else {
                err = new Error('La auditoría con el ID: ' + req.params.auditoriaId + ' no existe o no eres lider auditor de esta auditoría!');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
};

/**
 * Función que permite eliminar un auditoría por medio de su ID.
 * @param {*} req se recibe la solicitud DELETE con el ID de la auditoría, en donde se puede acceder al _id del usuario
 * después de verificar que el usuario esta autenticado, solo el lider auditor asociado a la auditoría puede eliminarla. 
 * @param {*} res me permite responder, statusCode: 200 con un objeto JSON de la auditoría eliminada, esta acción solo
 * permite ser realizada si es un lider_auditor de la auditoría.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado, en caso de que no se encuentre la auditoría o no sea lider auditor de la
 * auditoría respondera con un statusCode: 404 y un mensaje indicando esto.
 */
exports.eliminarAuditoria = (req, res, next) => {
    Auditorias.findOneAndRemove({ _id: req.params.auditoriaId, lider_auditor: req.user._id })
        .then((resp) => {
            if (resp != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }
            else {
                err = new Error('La auditoría con el ID: ' + req.params.auditoriaId + ' no existe o no eres lider auditor de esta auditoría!');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
};
