const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const bodyParser = require('body-parser');
const { query } = require('express')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


app.get('/', (req, resp) => {
    resp.send('<h1>Full Cycle!</h1>')
})

app.get('/people', (req, resp) => {
    const query = 'SELECT id, name FROM People'
    executeQuery(query, (result) => resp.send(result))
})

app.post('/people', (req, resp) => {
    const peopleName = req.body.name
    const query = `INSERT INTO People(name) values('${peopleName}')`
    executeQuery(query, (result) => resp.send(result))
})


app.listen(port, () => {
    console.log('Started at port: ', port)
})

const executeQuery = (query, callback) => {
    const connection = mysql.createConnection(config);
    connection.query(query, (err, result) => {
        connection.end()
        if (err) {
            throw err;
        }
        callback(result);
    });
}