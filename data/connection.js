const mysql = require('mysql2')

const credentials = {
    host : 'localhost', 
    user : 'root',
    password : 'root',
    database : 'my_blog'
}

const connection = mysql.createConnection(credentials)

connection.connect(err => {
    if (err){
        throw err        
    }
    console.info('connection succefull')
})


module.exports = connection