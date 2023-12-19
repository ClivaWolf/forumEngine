const express = require('express');
const data = require('./public/system/data.js');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const Data = require('./public/system/data.js');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    // Теперь req.body должен быть доступен
    const message = req.body.message
    console.log(message);

    if (message.type == 'newThread') {
        data.write('./data/temp', '{'+message.threadName+':0}')
    }
    res.json({ message: 'Message received' });
  });

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
   });







