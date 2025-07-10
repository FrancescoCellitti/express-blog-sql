const posts = require('../data/posts')




function index(req, res) {
    let filter = posts;
    francescocellitti()
    if (req.query.tags) {
        filter = posts.filter(
            post => post.tags.includes(req.query.tags)
        )
    }
    if (filter.length === 0) {
        res.status(404);
        return res.json({
            status: 404,
            error: "Not Found",
            message: "Pizza non trovata"
        })
    }
    res.json(filter)
}

function store(req, res) {
    /*  const newPost = {
         "titolo": "'Focaccia alle olive'",
         "contenuto": "'Una focaccia soffice e saporita arricchita con olive verdi.'",
         "immagine": "http://localhost:3030/images/focaccia_olive.jpeg",
         "tags": "[ 'pane', 'focaccia', 'aperitivo' ]"
     } */
    posts.push(req.body)
    console.log(req.body)


    res.status(201);
    res.json(posts);
}

function modify(req, res) {
    const id = parseInt(req.params.id)

    const post = posts[id]

    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }
    post.titolo = req.body.titolo;
    post.contenuto = req.body.contenuto;
    post.immagine = req.body.immagine;
    post.tags = req.body.tags;

    res.json(post)
    console.log(posts)

}
function deleted(req, res) {
    const post = posts.findIndex(post => post.titolo.toLowerCase().includes(req.query.titolo.toLowerCase()))
    if (post === -1) {
        res.status(404);
        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    posts.splice(post, 1);
    console.log(posts)
    res.status(204)
    res.end()



}

function error(err, req, res, next) {
    res.status(500)
    res.json({
        error: err.message,
    });
};

function notFound(req, res, next) {
    res.status(404)
    res.json({
        error: "Not Found",
        message: "Pagina non trovata"
    });
};



module.exports = { index, deleted, store, modify, notFound, error }