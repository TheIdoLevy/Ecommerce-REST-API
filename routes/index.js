const express = require('express');
const {authenticateUser, logout} = require('../controllers/login');
const {getAllProducts, getProductsByCategory, getProductByName} = require('../controllers/products');
const {registerUser} = require('../controllers/register');
const {intiallizeCart, addProductToCart, removeProductFromCart, getProductsFromCart, checkoutCart} = require('../controllers/cart');
const {getUserHistory} = require('../controllers/users');


const loginRouter = express.Router();
loginRouter.post('/', authenticateUser);

const logoutRouter = express.Router();
logoutRouter.get('/', logout);

const productsRouter = express.Router();
productsRouter.get('/', getAllProducts);
productsRouter.get('/:category', getProductsByCategory);
productsRouter.get('/exact/:name', getProductByName);

const registerRouter = express.Router();
registerRouter.post('/', registerUser);

const cartRouter = express.Router();
cartRouter.get('/', getProductsFromCart);
cartRouter.post('/initialize', intiallizeCart);
cartRouter.put('/', addProductToCart);
cartRouter.delete('/:productId', removeProductFromCart);
cartRouter.post('/checkout', checkoutCart);

const usersRouter = express.Router();
usersRouter.get('/history', getUserHistory);


module.exports = {
    loginRouter,
    logoutRouter,
    productsRouter,
    registerRouter,
    cartRouter,
    usersRouter,
};