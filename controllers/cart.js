const Queries = require('../model/queries');

const querySchema = {name: 'carts', customerId: '', productId: '', quantity: ''};
const cartQueries = new Queries(querySchema);

const intiallizeCart = (req, res) => {
    querySchema.customerId = req.session.user.id;
    cartQueries.initCart()
    .then(data => {
        if(!data.exists) res.send(data.res);
        res.send(data.msg);
    });
};

const addProductToCart = (req, res) => {
    querySchema.customerId = req.session.user.id;
    querySchema.productId = req.body.productId;
    querySchema.quantity = req.body.quantity;
    cartQueries.addProductToCart()
    .then((data) => {
        if(data.cartError) return res.send('Please initialize a cart first!');
        if(data.productError) return res.send('Please enter a valid product ID');
        res.send('Successfully added product to cart!');
    });
};

const removeProductFromCart = (req, res) => {
    querySchema.customerId = req.session.user.id;
    querySchema.productId = Number(req.params.productId);
    cartQueries.removeProductFromCart()
    .then(data => res.send(data));
};

const getProductsFromCart = (req, res) => {
    querySchema.customerId = req.session.user.id;
    cartQueries.getFromCartByCustomerId()
    .then(data => res.send(data.rows));
};

const checkoutCart = (req, res) => {
    querySchema.customerId = req.session.user.id;
    querySchema.paymentMethod = req.body.paymentMethod;
    querySchema.creditCardNumber = req.body.creditCardNumber;
    cartQueries.checkoutCart()
    .then(data => res.send(data));
};

module.exports = {
    intiallizeCart,
    addProductToCart,
    removeProductFromCart,
    getProductsFromCart,
    checkoutCart,
};
