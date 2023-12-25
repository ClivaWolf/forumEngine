const express = require('express');
const Data = require('./public/system/data.js');
const path = require('path');
const routes = require('./routes');
const app = express();
const cookieParser = require('cookie-parser');
const { json } = require('express/lib/response.js');

app.use(express.json());
// app.use(cookieParser());

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(routes);

Data.write('data/sessions', JSON.parse('{}'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = 3000;
app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}/`);
});