const express = require('express');
const app = express();
app.set('view engine', 'ejs');



app.get('/', function (req, res) {
  res.send('Hello World')
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
   });







