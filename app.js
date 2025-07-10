require('dotenv').config()
const port = process.env.PORT
const express = require('express')
const app = express()
const postsRouter = require('./routes/router')
const {notFound, error} = require('./controllers/postsController')

app.use(express.static('public'))
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1>Server del mio blog<h1>`)
})
app.use('/posts', postsRouter)







app.use(error)

app.use(notFound)


app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`);

})