const router = require('express').Router();
const authMiddleware = require('./middlewares/authUser');
const userController = require('./controllers/user.controller');
const itemsController = require('./controllers/items.controllers');

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);
router.delete('/deleteUser', authMiddleware, userController.deleteUser);
router.put('/update/:id', authMiddleware, userController.updateUser);

router.get('/user/:id', userController.getUserById);
router.get('/getUserByEmail', userController.getUserByEmail);
router.get('/getAllUsers', userController.getAllUsers);

router.post('/addItem', authMiddleware, itemsController.addItem);
router.get('/getItems/:id/:date', itemsController.getItemsByUserAndDate);
// router.get('/getItems', authMiddleware, itemsController.getItemsByUserAndDate);
router.delete('/deleteItem/:id', authMiddleware, itemsController.deleteItemById);
router.put('/updateItem', authMiddleware, itemsController.updateById);

module.exports = router;