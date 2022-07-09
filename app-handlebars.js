const express = require('express')
const {engine} = require('express-handlebars')

const app = express()

const fakeApi = () => [
    {name: 'cerveza', price: 250},
    {name: 'vodka', price: 400},
    {name: 'fernet', price: 770},
    {name: 'gancia', price: 520},
    {name: 'campari', price: 680}
]


app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', './views')


app.get('/', (req, res) => {
    res.send('OK')
})

app.get('/template', (req, res) => {
    res.render('main', {
        products: fakeApi(),
        listExists: true
    })
})
app.listen(8080)