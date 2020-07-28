var express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');
var userController = require('../controllers/userController');
const cors = require('./cors');

var router = express.Router();

/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, userController.getUsuarios);

router.post('/signup', cors.corsWithOptions, userController.registrarUsuario);

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), userController.loginUsuario);

module.exports = router;