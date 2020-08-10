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

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',passport.authenticate('google'), userController.getGoogleToken);

module.exports = router;