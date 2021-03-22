const router = require('express').Router();
const authMiddleware = require('./middlewares/authUser');
const userController = require('./controllers/user.controller');
const itemsController = require('./controllers/items.controllers');

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);
router.get('/getUser', userController.getUserByEmail);
router.get('/getAllUsers', userController.getAllUsers);
router.delete('/deleteUser', userController.deleteUser);
router.put('/update', userController.updateUser);


router.post('/addItem', itemsController.addItem);
router.get('/getItems', itemsController.getItemsByUserAndDate);
router.delete('/deleteItem', itemsController.deleteItemById);

module.exports = router;