const express = require('express')
const router = express.Router()
const port = process.env.PORT
const posts = require('../data/posts.js')
const { index, deleted, store, modify } = require('../controllers/postsController.js')
const connection = require('../data/connection.js')

router.get('/', (req, res) => {
    const sqlQuery = "SELECT * FROM posts"
    connection.query(sqlQuery, (err, results) => {
        console.log(err)
        if (err) return res.status(500).json({
            error: err.message
        })
        console.log(results)
        res.json(results)
    })

})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const sqlQuery = 'SELECT * FROM posts WHERE id = ?;'
    connection.query(sqlQuery, [id], (err, result) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        })
        else if (result.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'Post non trovato'
            })
        }
        res.json(result)

    })
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const sqlQuery = 'DELETE FROM posts WHERE id =?;'
    connection.query(sqlQuery, [id], (err, results) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        })
        else if (results.affectedRows === 0) {
            return res.status(404).json({
                error: true,
                message: 'Post non trovato'
            })
        }
    res.status(204)
    res.send()
    })
    


})





module.exports = router