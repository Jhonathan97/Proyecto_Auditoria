const mongoose = require('mongoose');
const Informes = require('../models/informes');
const Auditorias = require('../models/auditorias');
const { populate } = require('../models/auditorias');
const ITEMS = require('../shared/items');

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
 * @param {"nombre": "", "nombre_clientes":[{"nombre": ""},{"apellido": ""}], "miembros_equipo":[]} req recibe la
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
        .populate({ path: 'informe', select: 'nombre' })
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

/**
 * Función que permite obtener el informe de un auditoría especifica
 * @param {*} req recibe la solicitud GET con el ID de la auditoría, en donde se puede acceder al _id del usuario después
 * de verificar que el usuario esta autenticado.
 * @param {*} res me permite responder, statusCode: 200 con un objeto JSON del informe de la auditoría, esta acción solo
 * permite ser realizada si es un lider_auditor o si pertenece a los miembros del equipo de la auditoría.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado, en caso de que no se encuentre la auditoría, no este asociada o la auditoría
 * no cuente con un informe, respondera con un statusCode: 404 y un mensaje indicando esto. 
 */
exports.getInforme = (req, res, next) => {
    Auditorias.findOne({
        _id: req.params.auditoriaId,
        $or: [
            { lider_auditor: req.user._id },
            { miembros_equipo: { _id: req.user._id } }
        ]
    })
        .then((auditoria) => {
            if (auditoria != null) {
                Informes.findById(auditoria.informe)
                    .then((informe) => {
                        if (informe != null) {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(informe);
                        }
                        else {
                            err = new Error('La auditoría con el ID: ' + req.params.auditoriaId + ' no contiene un informe!');
                            err.status = 404;
                            return next(err);
                        }
                    }, (err) => next(err));
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
 * Función que permite crear el informe de un auditoría especifica
 * @param {"nombre": ""} req recibe la solicitud POST con el ID de la auditoría y JSON indicado,  en donde se puede
 * acceder al _id del usuario después de verificar que el usuario esta autenticado.
 * @param {*} res me permite responder, statusCode: 200 con un objeto JSON del informe de la auditoría creado con los
 * ITEMS ya predefinidos que están en el archivo shared/items.js, esta acción solo permite ser realizada si es un
 * lider_auditor de la auditoría.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado, en caso de que no se encuentre la auditoría, o no sea lider auditor de la
 * auditoría, o la auditoría ya tenga un informe creado respondera con un statusCode: 404 y un mensaje indicando esto.
 */
exports.crearInforme = (req, res, next) => {
    Auditorias.findOne({ _id: req.params.auditoriaId, lider_auditor: req.user._id })
        .then((auditoria) => {
            if (auditoria != null) {
                if (auditoria.informe == null) {
                    req.body.items = ITEMS;
                    Informes.create(req.body)
                        .then((informe) => {
                            auditoria.informe = informe._id;
                            auditoria.save()
                                .then((auditoria) => {
                                    informe.items.map((item) => {
                                        item.autor = auditoria.lider_auditor;
                                    });
                                    informe.save()
                                        .then((informe) => {
                                            res.statusCode = 200;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.json(informe);
                                        }, (err) => next(err));
                                }, (err) => next(err));

                        }, (err) => next(err));
                }
                else {
                    err = new Error('La auditoría con el ID: ' + req.params.auditoriaId + ' ya cuenta con un informe!');
                    err.status = 404;
                    return next(err);
                }
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
 * Función que permite eliminar el informe de un auditoría especifica
 * @param {*} req recibe la solicitud DELETE con el ID de la auditoría, en donde se puede acceder al _id del usuario
 * después de verificar que el usuario esta autenticado.
 * @param {*} res me permite responder, statusCode: 200 con un objeto JSON de la auditoría sin el informe asociado, esta
 * acción solo permite ser realizada si es un lider_auditor de la auditoría.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado, en caso de que no se encuentre la auditoría o no sea lider auditor de la
 * auditoría respondera con un statusCode: 404 y un mensaje indicando esto.
 */
exports.eliminarInforme = (req, res, next) => {
    Auditorias.findOne({ _id: req.params.auditoriaId, lider_auditor: req.user._id })
        .then((auditoria) => {
            if (auditoria != null) {
                Informes.findByIdAndDelete(auditoria.informe)
                    .then((resp) => {
                        if (resp != null) {
                            auditoria.informe = null;
                            auditoria.save()
                                .then((auditoria) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(auditoria);
                                }, (err) => next(err));
                        }
                        else {
                            err = new Error('La auditoría con el ID: ' + req.params.auditoriaId + ' no contiene un informe!');
                            err.status = 404;
                            return next(err);
                        }
                    }, (err) => next(err));
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
 * Función que permite agregar un nuevo item al informe de un auditoría especifica
 * @param {"nombre": "", "contenido": ""} req recibe la solicitud POST con el ID de la auditoría y el JSON indicado, donde
 * el contenido no es requerido, además en dicha solicitud se puede acceder al _id del usuario después
 * de verificar que el usuario esta autenticado.
 * @param {*} res me permite responder, statusCode: 200 con un objeto JSON del informe de la auditoría con el item nuevo
 * agregado y el autor se asocia al usuario que esta agregando dicho item. Esta acción solo permite ser realizada si es
 * un lider_auditor o si pertenece a los miembros del equipo de la auditoría.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado, en caso de que no se encuentre la auditoría, no este asociada, o la auditoría
 * no cuente con un informe, respondera con un statusCode: 404 y un mensaje indicando esto. 
 */
exports.agregarItem = (req, res, next) => {
    Auditorias.findOne({
        _id: req.params.auditoriaId,
        $or: [
            { lider_auditor: req.user._id },
            { miembros_equipo: { _id: req.user._id } }
        ]
    })
        .then((auditoria) => {
            if (auditoria != null) {
                Informes.findById(auditoria.informe)
                    .then((informe) => {
                        if (informe != null) {
                            req.body.autor = req.user._id;
                            informe.items.push(req.body);
                            informe.save()
                                .then((informe) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(informe);
                                }, (err) => next(err));
                        }
                        else {
                            err = new Error('La auditoría con el ID: ' + req.params.auditoriaId + ' no contiene un informe!');
                            err.status = 404;
                            return next(err);
                        }
                    }, (err) => next(err));
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
 * Función que permite editar un item del informe de un auditoría especifica
 * @param {"nombre": "", "contenido": ""} req recibe la solicitud PUT con el ID de la auditoría y del item a editar,
 * además, del JSON indicado, también en dicha solicitud se puede acceder al _id del usuario después de verificar que el
 * usuario esta autenticado.
 * @param {*} res me permite responder, statusCode: 200 con un objeto JSON del informe de la auditoría con el item editado
 * y el autor se asocia al usuario que esta editando dicho item. Esta acción solo permite ser realizada si es
 * un lider_auditor o si pertenece a los miembros del equipo de la auditoría.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado, en caso de que no se encuentre la auditoría, no este asociada,o la auditoría
 * no cuente con un informe, o item que se desea editar no existe, respondera con un statusCode: 404 y un mensaje
 * indicando esto. 
 */
exports.editarItem = (req, res, next) => {
    Auditorias.findOne({
        _id: req.params.auditoriaId,
        $or: [
            { lider_auditor: req.user._id },
            { miembros_equipo: { _id: req.user._id } }
        ]
    })
        .then((auditoria) => {
            if (auditoria != null) {
                Informes.findById(auditoria.informe)
                    .then((informe) => {
                        if (informe != null) {
                            if (informe.items.id(req.params.itemId) != null) {
                                if (req.body.nombre)
                                    informe.items.id(req.params.itemId).nombre = req.body.nombre;
                                if (req.body.contenido)
                                    informe.items.id(req.params.itemId).contenido = req.body.contenido;
                                req.body.autor = req.user._id;
                                informe.save()
                                    .then((informe) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(informe);
                                    }, (err) => next(err));
                            }
                            else {
                                err = new Error('El Item con el ID: ' + req.params.itemId + ' no se encontro!');
                                err.status = 404;
                                return next(err);
                            }
                        }
                        else {
                            err = new Error('La auditoría con el ID: ' + req.params.auditoriaId + ' no contiene un informe!');
                            err.status = 404;
                            return next(err);
                        }
                    }, (err) => next(err));
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
 * Función que permite eliminar un item del informe de un auditoría especifica
 * @param {} req recibe la solicitud DELETE con el ID de la auditoría y del item a eliminar, además en dicha solicitud se
 * puede acceder al _id del usuario después de verificar que el usuario esta autenticado.
 * @param {*} res me permite responder, statusCode: 200 con un objeto JSON del informe de la auditoría y sin el item.
 * Esta acción solo permite ser realizada si es un lider_auditor o si pertenece a los miembros del equipo de la auditoría.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado, en caso de que no se encuentre la auditoría, no este asociada,o la auditoría
 * no cuente con un informe, o item que se desea eliminar no existe, respondera con un statusCode: 404 y un mensaje
 * indicando esto. 
 */
exports.eliminarItem = (req, res, next) => {
    Auditorias.findOne({
        _id: req.params.auditoriaId,
        $or: [
            { lider_auditor: req.user._id },
            { miembros_equipo: { _id: req.user._id } }
        ]
    })
        .then((auditoria) => {
            if (auditoria != null) {
                Informes.findById(auditoria.informe)
                    .then((informe) => {
                        if (informe != null) {
                            if (informe.items.id(req.params.itemId) != null) {
                                informe.items.pull(req.params.itemId);
                                informe.save()
                                    .then((informe) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(informe);
                                    }, (err) => next(err));
                            }
                            else {
                                err = new Error('El Item con el ID: ' + req.params.itemId + ' no se encontro!');
                                err.status = 404;
                                return next(err);
                            }
                        }
                        else {
                            err = new Error('La auditoría con el ID: ' + req.params.auditoriaId + ' no contiene un informe!');
                            err.status = 404;
                            return next(err);
                        }
                    }, (err) => next(err));
            }
            else {
                err = new Error('La auditoría con el ID: ' + req.params.auditoriaId + ' no existe o no pertenece a sus auditorías!');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
};