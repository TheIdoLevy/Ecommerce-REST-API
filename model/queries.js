const pool = require('../model/pool');
const bcrypt = require('bcrypt');
const validateCreditCard = require('../controllers/utils');

class Queries {
    constructor(schema){
        this.schema = schema;
    }

    async getAllFromSchema(){
        const products = await pool.query(`SELECT * FROM ${this.schema.name}`);
        return products.rows;
    }

    async getFromSchemaByCategory(){
        const products = await pool.query(`SELECT * FROM ${this.schema.name} WHERE category = '${this.schema.category}'`);
        if(!products.rows[0]) return {error: true, message: "Please enter a valid category"};
        return {error: false, products};
    }

    async getFromSchemaByName(){
        const products = await pool.query(`SELECT * FROM ${this.schema.name} WHERE name = '${this.schema.product}'`);
        return products;
    }

    async registerUser(){
        const {username, hashedPassword, firstName, lastName, email} = this.schema.userDetails;
        try {
            const user = await pool.query(`INSERT INTO customers (username, password, first_name, last_name, email) VALUES(
                '${username}', '${hashedPassword}', '${firstName}', '${lastName}', '${email}'
            )`);
            const userId = await pool.query(`SELECT id FROM customers WHERE username='${username}'`);
            return {error: false, data: userId.rows[0]};
        } catch(err) {
            return {error: true, errorMessage: "A problem occurred. Please try a different username and/or password"}
        };
    }


    async loginUser(){
        const {password, username} = this.schema;
        const user = await pool.query(`SELECT * from customers WHERE username='${username}'`);
        if(!user.rows[0]) return null;
        const matchedPassword = await bcrypt.compare(password, user.rows[0].password);
        if(matchedPassword) return {match: true, id: user.rows[0].id};
        return false;
    }

    async getFromCartByCustomerId(){
        const cart = await pool.query(`SELECT * FROM carts WHERE customer_id = ${this.schema.customerId}`);
        return cart;
    }

    async initCart(){
        const cartExists = await pool.query(`SELECT * FROM carts WHERE customer_id = ${this.schema.customerId}`);
        if(cartExists.rows[0]) return {exists: true, msg: "A cart has already been initialized for you. You can start shopping."};
        const newCart = await pool.query(`INSERT INTO carts (customer_id) VALUES (${this.schema.customerId})`);
        return {exists: false, res: 'Successfully initialized your cart! Happy Shopping!'};
    }

    async addProductToCart(){
        try {
            const cartId = await pool.query(`SELECT * FROM carts WHERE customer_id = ${this.schema.customerId}`);
            if (!cartId.rows[0] ) return {cartError:true, productError:false};
            const updatedCart = await pool.query(`INSERT INTO carts (id, customer_id, product_id, quantity) VALUES (
                ${cartId.rows[0].id}, ${this.schema.customerId}, ${this.schema.productId}, 1
            )`);
            return updatedCart;
        } catch(err) {
            return {cartError:false, productError:true};
        };
    }

    async removeProductFromCart(){
        try {
        const updatedCart = await pool.query(`DELETE FROM carts WHERE customer_id=${this.schema.customerId} AND product_id=${this.schema.productId} RETURNING *`);
        if(!updatedCart.rows[0]) return 'No such product in cart';
        return 'Successfully removed product from cart';
        } catch(err){
            return {err: true, msg: err.msg}
        };
    }

    async checkoutCart(){
        try{
            const cart = await pool.query(`SELECT * FROM carts JOIN products ON carts.product_id = products.id WHERE customer_id = ${this.schema.customerId}`);
            if(!cart.rows[0]) return "Please Initialize a cart or add products to your cart";
            let totalPrice = 0;
            for (let item of cart.rows){totalPrice+=item.price};
            if( totalPrice === 0 || totalPrice === NaN ) return "Please add items to your cart";
            if(this.schema.paymentMethod==="Credit card"){
                if(!validateCreditCard(this.schema.creditCardNumber)) return "Please enter a valid credit card number";
            };
            const d = new Date();
            await pool.query(`INSERT INTO checked_out_carts (customer_id, total_price, date, time, payment_method) VALUES (${this.schema.customerId}, ${totalPrice}, '${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}', '${d.getHours()}${d.getMinutes()}', '${this.schema.paymentMethod}')`);
            await pool.query(`DELETE FROM carts WHERE customer_id=${this.schema.customerId}`);
            return 'Successfully checked out! Thank you!';
        } catch(err) {
            return err.message;
        }
    }

    async getUserHistory(){
        const userHistory = await pool.query(`SELECT * FROM checked_out_carts WHERE customer_id=${this.schema.customerId}`);
        if(!userHistory.rows[0]) return "No history! Buy something first!";
        return userHistory.rows;
    }
};


module.exports = Queries;
