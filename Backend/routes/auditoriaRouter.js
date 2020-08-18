const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const auditoriaController = require('../controllers/auditoriaController');
const cors = require('./cors');

const auditoriaRouter = express.Router();

auditoriaRouter.use(bodyParser.json());

auditoriaRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.getAuditorias)
    .post(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.crearAuditoria);

auditoriaRouter.route('/:auditoriaId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.getAuditoria)
    .put(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.editarAuditoria)
    .delete(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.eliminarAuditoria);

module.exports = auditoriaRouter;