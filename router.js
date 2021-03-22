const router = require('express').Router();
const authMiddleware = require('./middlewares/authUser');
const userController = require('./controllers/user.controller');

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);
router.get('/getUser', userController.getUserByEmail);
router.get('/getAllUsers', userController.getAllUsers);
router.delete('/deleteUser', userController.deleteUser);
router.put('/update', userController.updateUser);

module.exports = router;