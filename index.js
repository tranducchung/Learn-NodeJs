const express = require('express');
var UserRoute = require('./routes/user.route')
const app = express()
const port = 8081;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req,res) => res.render('index', {
   locals: {name: 'Chung'}
}))

app.use('/users', UserRoute)



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
