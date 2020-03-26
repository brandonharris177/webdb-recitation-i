const express = require('express');
const router = express.Router()
const Reviews = require('./reveiws-model')

router.get('/', (req, res) => {
    const {limit, sortBy, sortDir} = req.query;
    Reviews.get({ limit, sortBy, sortDir })
    .then(reviews => {
        res.status(200).json({reviews})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            err: error,
            message: error.message
        })
    })
})

router.post('/', (req, res) => {
    const { rating, comment, user_id, book_id } = req.body;
    Reviews.insert({ rating, comment, user_id, book_id })
    .then(review => {
        res.status(201).json(review);
    })
    .catch(error => {
        res.status(500).json({
            err: error,
            message: error.message
        })
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Reviews.getById(id)
    .then(review => {
        if (review) {
            res.status(200).json({review})
        } else {
            res.status(404).json(`review not found, ${id}`)
        }       
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            err: error,
            message: error.message
        })
    })
})

module.exports = router