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

auditoriaRouter.route('/:auditoriaId/informes')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.getInforme)
    .post(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.crearInforme)
    .delete(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.eliminarInforme);

auditoriaRouter.route('/:auditoriaId/informes/items')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .post(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.agregarItem);

auditoriaRouter.route('/:auditoriaId/informes/items/:itemId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .put(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.editarItem)
    .delete(cors.corsWithOptions, authenticate.verifyUser, auditoriaController.eliminarItem);

module.exports = auditoriaRouter;