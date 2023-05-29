const Queries = require('../model/queries');

const querySchema = {name: 'products', category: '', product: ''};
const productQueries = new Queries(querySchema);

const getAllProducts = (req, res) => {
    productQueries.getAllFromSchema()
    .then(data => res.send(data));
};

const getProductsByCategory = (req, res) => {
    querySchema.category = req.params.category;
    productQueries.getFromSchemaByCategory()
    .then((data) => {
        if(data.error) return res.send(data.message);
        res.send(data.products.rows);
    });
};

const getProductByName = (req, res) => {
    querySchema.product = req.params.name;
    productQueries.getFromSchemaByName()
    .then(data => res.send(data.rows[0]));
};

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductByName,
};