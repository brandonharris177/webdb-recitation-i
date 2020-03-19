const db = require("../data/db")

module.exports = {
    get,
    getById
};

function get(options) {
    let query = db('reviews')
    if (options.limit) {
        query = query.limit(parseInt(options.limit, 10));
    }
    return query;
}

function getById(id) {
    return db('reviews').where({ id }).first()
}