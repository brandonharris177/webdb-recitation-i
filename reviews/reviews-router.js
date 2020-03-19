const express = require('express');
const router = express.Router()
const Reviews = require('./reveiws-model')

router.get('/', (req, res) => {
    const {limit, soryBy, sortDir} = req.query;
    Reviews.get({ limit, soryBy, sortDir})
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