const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));

const mainRoutes = require('./routes');
const bookRoutes = require('./routes/book');
const errorRoutes = require('./routes/error');
app.use('/', mainRoutes);
app.use('/books', bookRoutes);
app.use(errorRoutes);

const port = process.env.PORT || 3210;

app.listen(port, () => {
    console.log('Listening on "localhost:3000/"...');
});