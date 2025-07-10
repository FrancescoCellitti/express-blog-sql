const express = require('express')
const router = express.Router()
const port = process.env.PORT
const posts = require('../data/posts.js')
const { index, deleted, store, modify} = require('../controllers/postsController.js')
const connection = require('../data/connection.js')


module.exports = router