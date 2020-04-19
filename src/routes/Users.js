'use strict';

var express     = require('express'),
    router      = express.Router(),
    userController = require('../controllers/User'),
    Auth = require('../controllers/Auth');
    
router.post('/users/login', userController.login);    

router.post('/users/register', userController.createUsers);

router.get('/users/verification/:email/:key', userController.verifyUser);

router.use(Auth.verifyToken)

router.get('/users', Auth.verifyToken, userController.users);

router.get('/users/:user_id', Auth.verifyToken, userController.findUsers);

router.post('/users', Auth.verifyToken, userController.createUsers);    

router.put('/users', Auth.verifyToken, userController.updateUsers);

router.delete('/users', Auth.verifyToken, userController.deleteUsers);

module.exports = router;        