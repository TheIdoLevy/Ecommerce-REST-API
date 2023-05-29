const Queries = require('../model/queries');

const querySchema = {userId: ''};
const userQueries = new Queries(querySchema);

const getUserHistory = (req, res) => {
    querySchema.customerId = req.session.user.id;
    userQueries.getUserHistory()
    .then(data => res.send(data));
};

module.exports = {getUserHistory};