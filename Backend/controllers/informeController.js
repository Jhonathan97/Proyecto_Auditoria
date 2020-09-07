const mongoose = require("mongoose");
const Informes = require("../models/informes");
const Auditorias = require("../models/auditorias");
const { populate } = require("../models/auditorias");
const ITEMS = require("../shared/items");
var nodemailer = require("nodemailer");

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
      { miembros_equipo: { _id: req.user._id } },
    ],
  })
    .then(
      (auditoria) => {
        if (auditoria != null) {
          Informes.findOne({ auditoria: req.params.auditoriaId }).then(
            (informe) => {
              if (informe != null) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ success: true, informe: informe });
              } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  success: false,
                  status:
                    "La auditoría con el ID: " +
                    req.params.auditoriaId +
                    " no contiene un informe!",
                });
              }
            },
            (err) => next(err)
          );
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            status:
              "La auditoría con el ID: " +
              req.params.auditoriaId +
              " no existe o no pertenece a sus auditorías!",
          });
        }
      },
      (err) => next(err)
    )
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
exports.sendReport = (req, res) => {
  var correo=req.body.correo;
  var contenidoCorreo=req.body.contenidoCorreo;
  var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "keshawn18@ethereal.email",
      pass: "qsvH7aAGQ4jcdAwxx9",
    },
  });

  var mailOptions = {
    from: "remitente App Auditorias", // sender address
    to: correo, // list of receivers
    subject: "Mensaje de envio de Informe de Auditoria", // Subject line
    text: contenidoCorreo, //
    //text: req.contenidoCorreo, // subject line
    //html: `<img src="https://d1hoh05jeo8jse.cloudfront.net/media/google/gmail-icon.jpg"><strong>test</strong>El nombre es ${nombre} <br />con el correo ${correo} y El mensaje es ${mensaje}, ah y el tema es ${tema}.`,
  };
  transporter.sendMail(mailOptions, function (error, info){
    if (error) {
      console.log(error);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json(error.message);
    } else {
      console.log("mensaje enviado con correo"+correo+"contenido:"+contenidoCorreo);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(req.body);
    }
  });
};
exports.crearInforme = (req, res, next) => {
  Auditorias.findOne({
    _id: req.params.auditoriaId,
    lider_auditor: req.user._id,
  })
    .then(
      (auditoria) => {
        if (auditoria != null) {
          Informes.findOne({ auditoria: req.params.auditoriaId }).then(
            (informe) => {
              if (informe == null) {
                req.body.items = ITEMS;
                req.body.auditoria = req.params.auditoriaId;
                Informes.create(req.body).then(
                  (informe) => {
                    informe.items.map((item) => {
                      item.autor = auditoria.lider_auditor;
                    });
                    informe.save().then(
                      (informe) => {
                        res.statusCode = 201;
                        res.setHeader("Content-Type", "application/json");
                        res.json({ success: true, informe: informe });
                      },
                      (err) => next(err)
                    );
                  },
                  (err) => next(err)
                );
              } else {
                res.statusCode = 412;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  success: false,
                  status:
                    "La auditoría con el ID: " +
                    req.params.auditoriaId +
                    " ya cuenta con un informe!",
                });
              }
            },
            (err) => next(err)
          );
        } else {
          res.statusCode = 412;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            status:
              "La auditoría con el ID: " +
              req.params.auditoriaId +
              " no existe o no eres lider auditor de esta auditoría!",
          });
        }
      },
      (err) => next(err)
    )
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
  Auditorias.findOne({
    _id: req.params.auditoriaId,
    lider_auditor: req.user._id,
  })
    .then(
      (auditoria) => {
        if (auditoria != null) {
          Informes.findOneAndDelete({ auditoria: req.params.auditoriaId }).then(
            (resp) => {
              if (resp != null) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ success: true });
              } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  success: false,
                  status:
                    "La auditoría con el ID: " +
                    req.params.auditoriaId +
                    " no contiene un informe!",
                });
              }
            },
            (err) => next(err)
          );
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            status:
              "La auditoría con el ID: " +
              req.params.auditoriaId +
              " no existe o no eres lider auditor de esta auditoría!",
          });
        }
      },
      (err) => next(err)
    )
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
      { miembros_equipo: { _id: req.user._id } },
    ],
  })
    .then(
      (auditoria) => {
        if (auditoria != null) {
          Informes.findOne({ auditoria: req.params.auditoriaId }).then(
            (informe) => {
              if (informe != null) {
                req.body.autor = req.user._id;
                informe.items.push(req.body);
                informe.save().then(
                  (informe) => {
                    res.statusCode = 201;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ success: true, informe: informe });
                  },
                  (err) => next(err)
                );
              } else {
                res.statusCode = 412;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  success: false,
                  status:
                    "La auditoría con el ID: " +
                    req.params.auditoriaId +
                    " no contiene un informe!",
                });
              }
            },
            (err) => next(err)
          );
        } else {
          res.statusCode = 412;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            status:
              "La auditoría con el ID: " +
              req.params.auditoriaId +
              " no existe o no eres lider auditor de esta auditoría!",
          });
        }
      },
      (err) => next(err)
    )
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
      { miembros_equipo: { _id: req.user._id } },
    ],
  })
    .then(
      (auditoria) => {
        if (auditoria != null) {
          Informes.findOne({ auditoria: req.params.auditoriaId }).then(
            (informe) => {
              if (informe != null) {
                if (informe.items.id(req.params.itemId) != null) {
                  if (req.body.nombre)
                    informe.items.id(req.params.itemId).nombre =
                      req.body.nombre;
                  if (req.body.contenido)
                    informe.items.id(req.params.itemId).contenido =
                      req.body.contenido;
                  req.body.autor = req.user._id;
                  informe.save().then(
                    (informe) => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(informe);
                    },
                    (err) => next(err)
                  );
                } else {
                  err = new Error(
                    "El Item con el ID: " +
                      req.params.itemId +
                      " no se encontro!"
                  );
                  err.status = 404;
                  return next(err);
                }
              } else {
                err = new Error(
                  "La auditoría con el ID: " +
                    req.params.auditoriaId +
                    " no contiene un informe!"
                );
                err.status = 404;
                return next(err);
              }
            },
            (err) => next(err)
          );
        } else {
          err = new Error(
            "La auditoría con el ID: " +
              req.params.auditoriaId +
              " no existe o no pertenece a sus auditorías!"
          );
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
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
      { miembros_equipo: { _id: req.user._id } },
    ],
  })
    .then(
      (auditoria) => {
        if (auditoria != null) {
          Informes.findOne({ auditoria: req.params.auditoriaId }).then(
            (informe) => {
              if (informe != null) {
                if (informe.items.id(req.params.itemId) != null) {
                  informe.items.pull(req.params.itemId);
                  informe.save().then(
                    (informe) => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(informe);
                    },
                    (err) => next(err)
                  );
                } else {
                  err = new Error(
                    "El Item con el ID: " +
                      req.params.itemId +
                      " no se encontro!"
                  );
                  err.status = 404;
                  return next(err);
                }
              } else {
                err = new Error(
                  "La auditoría con el ID: " +
                    req.params.auditoriaId +
                    " no contiene un informe!"
                );
                err.status = 404;
                return next(err);
              }
            },
            (err) => next(err)
          );
        } else {
          err = new Error(
            "La auditoría con el ID: " +
              req.params.auditoriaId +
              " no existe o no pertenece a sus auditorías!"
          );
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};
