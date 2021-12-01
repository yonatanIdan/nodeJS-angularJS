const express = require('express');
const router = express.Router();
const { usersController } = require('../controlles/usersController');
const middleware = require('./passport/middleware');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/users', middleware.checkToken, (req, res) => usersController.users(req, res));
router.post('/deleteuser', middleware.checkToken, middleware.isAdmin, (req, res) => usersController.deleteUser(req, res));
router.post('/newuser', middleware.checkToken, middleware.isAdmin, (req, res) => usersController.newUser(req, res));
router.post('/updateuser', middleware.checkToken, middleware.isTeacher, (req, res) => usersController.updateUser(req, res));

module.exports = router;