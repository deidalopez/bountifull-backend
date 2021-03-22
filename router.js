const router = require('express').Router();
const authMiddleware = require('./middlewares/authUser');
const userController = require('./controllers/user.controller');
const itemsController = require('./controllers/items.controllers');

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);


router.post('/addItem', itemsController.addItem);
router.get('/getItems', itemsController.getItemsByUserAndDate);
router.delete('/deleteItem', itemsController.deleteItemById);
router.put('/updateItem', itemsController.updateById);

module.exports = router;