const db = require("../data/db")

module.exports = {
    get,
    getById, 
    insert
};

function get({limit, sortBy, sortDir = " DESC"}) {
    let query = db('reviews')
    if (sortBy) {
        query = query.orderBy(sortBy, sortDir || "DESC");
    }
    if (limit) {
        query = query.limit(parseInt(limit, 10));
    }
    return query;
}

function getById(id) {
    return db('reviews').where({ id }).first()
}

function insert(reveiw) {
    return db('reviews')
        .insert(reveiw)
        .then(([id]) => getById(id));
}