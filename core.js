const express = require('express');
const Data = require('./public/system/data.js');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    const threads = await Data.getThreads();
    res.render('index', { threads: threads });
 });

app.post('/', (req, res) => {
    // Теперь req.body должен быть доступен
    const message = req.body.message
    console.log(message);

    let ret = ''

    if (message.type == 'newThread') {
        Data.addThread(message.threadName)
        //data.write('/data/temp', '{'+message.threadName+':0}')
    }
    if (message.type == 'getThreads') {
        ret = Data.getThreads()
    }
    res.json({ message: ret });
  });

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
   });







