const router = require('express').Router();
const userController = require('./controllers/user.controller');

router.post('/register', userController.createUser);
router.get('/login', userController.login);

module.exports = router;