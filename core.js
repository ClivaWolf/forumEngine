const express = require('express');
const Data = require('./public/system/data.js');
const path = require('path');
const routes = require('./routes');
const app = express();

app.use(routes);

Data.write('data/sessions', '{}')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
