const express = require('express');
const Data = require('./public/system/data.js');
const path = require('path');
const app = express();

Data.write('data/sessions', '{}')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    const threads = await Data.getThreads();
    res.cookie('session_id', 'asfx12', { maxAge: 900000, httpOnly: true });
    res.render('index', { threads: threads });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.use(function (req, res, next) {
    if (req.path !== '/oops') {
        res.redirect('/oops');
    } else {
        next();
    }
 });
 
 app.get('/oops', (req, res) => {
    res.render('oops');
 });

app.post('/', (req, res) => {
    const message = req.body.message
    console.log(message);

    if (message.type == 'newThread') {
        Data.addThread(message.threadName)
        //data.write('/data/temp', '{'+message.threadName+':0}')
    }
    res.json({ message: 'done' });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


