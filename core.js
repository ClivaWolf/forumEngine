const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
   });

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
   });







