const Queries = require('../model/queries');
const bcrypt = require('bcrypt');

const querySchema = {name: 'register', userDetails: ''};
const reqisterQueries = new Queries(querySchema);

const registerUser = async (req, res) => {
        const {username, password, firstName, lastName, email} = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        querySchema.userDetails = {username, hashedPassword, firstName, lastName, email};
        reqisterQueries.registerUser()
        .then((data) => {
            if(!data.error){
                req.session.user = data.data;
                req.session.authenticated = true;
                console.log(req.session);
                res.send('Successfuly registered! Enjoy!');
            } else {
                res.send(data.errorMessage);
            };
        });
};

module.exports = {registerUser};