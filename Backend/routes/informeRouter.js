const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../authenticate");
const informeController = require("../controllers/informeController");
const cors = require("./cors");

const informeRouter = express.Router();

informeRouter.use(bodyParser.json());

informeRouter
  .route("/:auditoriaId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(
    cors.corsWithOptions,
    authenticate.verifyUser,
    informeController.getInforme
  )
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    informeController.crearInforme
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    informeController.eliminarInforme
  );

informeRouter
  .route("/:auditoriaId/items")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    informeController.agregarItem
  );

informeRouter
  .route("/:auditoriaId/items/:itemId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    informeController.editarItem
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    informeController.eliminarItem
  );

informeRouter
  .route("/auditoria/sendReport")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    informeController.sendReport
  );

module.exports = informeRouter;
