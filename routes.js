const express = require('express');
const Data = require('./public/system/data.js');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const uuid = require('uuid');

router.use(express.static(path.join(__dirname, 'public')));

router.use(bodyParser.urlencoded({ extended: true }));

router.get(['/', '/main', '/forum'], async (req, res) => {
   const threads = await Data.getThreads();
   const session_id = uuid.v4()

   res.cookie('session_id', session_id, { maxAge: 900000, httpOnly: true });
   res.render('index', { threads: threads });
});

router.get('/login', (req, res) => {
   res.render('login');
});

router.post('/reg', (req, res) => {
   console.log(req.body)
   Data.regUser(req.body.name, req.body.password)
   res.redirect('/login')
});

router.post('/log', async (req, res) => {
   const redirectUrl = await Data.checkUser(req.body.uname, req.body.psw);
   res.redirect(redirectUrl);
});

router.get('/register', (req, res) => {
   res.render('register');
});

router.use(function (req, res, next) {
   if (req.path !== '/oops') {
      res.redirect('/oops');
   } else {
      next();
   }
});

router.get('/oops', (req, res) => {
   res.render('oops');
});

router.post('/newThread', (req, res) => {
   Data.addThread(req.body.value)
   res.json({ message: 'done' });
});

module.exports = router;