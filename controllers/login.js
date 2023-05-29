const Queries = require('../model/queries');

const queriesSchema = {name: 'login', username: '', password: ''};
const loginQueries = new Queries(queriesSchema);

const authenticateUser = (req, res) => {
    const {username, password} = req.body;
    queriesSchema.username = username;
    queriesSchema.password = password;
    loginQueries.loginUser()
    .then((success) => {
        try{
            if(success.match){
                req.session.user = {id: success.id};
                req.session.authenticated = true;
                console.log(req.session);
                res.send('Successfuly logged in. Enjoy!');
            } else {
                res.status(403).send("Bad credentials!");  
            };
        } catch(error) {
            res.status(403).send("Bad credentials!");
        };
    });
};

const checkIfAuthenticated = (req, res, next) => {
    if(req.session.authenticated){
        next();
    } else {
        res.send("Please authenticate yourself!");
    };
};

const logout = (req, res) => {
    req.session.authenticated = false;
    res.send("Successfuly logged out");
};

module.exports = {
    authenticateUser,
    checkIfAuthenticated,
    logout,
};
