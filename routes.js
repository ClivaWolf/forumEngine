const express = require('express');
const Data = require('./public/system/data.js');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const uuid = require('uuid');
const audit = require('express-requests-logger');
const cookieParser = require('cookie-parser');

router.use(express.json());
router.use(cookieParser('clv12345'));
//router.use(audit());
router.use(express.static(path.join(__dirname, 'public')));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser('clv12345'));

// router.get(['/', '/main', '/forum'], async (req, res) => {
//    const threads = await Data.getThreads();
//    // const session_id = uuid.v4()

//    // res.cookie('session_id', session_id, { maxAge: 900000, httpOnly: true });
//    res.render('index', { threads: threads });
// });

const options = {
   maxAge: 900000, // Время жизни куки - 15 минут
   httpOnly: true, // Кука не будет доступна через JavaScript
   secure: false, // Кука будет отправлена через HTTP и HTTPS
   signed: true // Кука будет подписана
  };


router.get(['/', '/main', '/forum'], async (req, res) => {
  try {
    const threads = await Data.getThreads();

    res.cookie('name', 'value', { signed: true, secret: 'clv12345' });

    res.render('index', { threads: threads, userInfo: await Data.getUserInfo(req.cookies.session_id) });
  } catch (error) {
    console.error(error);
  }
});

router.get('/login', async (req, res) => {
   res.render('login', { userInfo: await Data.getUserInfo(req.cookies.session_id)});
});

router.post('/log', async (req, res) => {
   const redirectUrl = await Data.checkUser(req.body.uname, req.body.psw);
   if (redirectUrl == '/main') {
      await Data.delLastSession(req.body.uname);
      const session_id = uuid.v4();
      res.cookie('session_id', session_id, { maxAge: 900000, httpOnly: true });
      Data.addSession(session_id, req.body.uname);
   }
   res.redirect(redirectUrl);
 });

router.get('/logout', (req, res) => {
   Data.delSession(req.cookies.session_id);
   res.clearCookie('session_id');
   res.redirect('/login');
})

router.get('/register', async (req, res) => {
   res.render('register', { userInfo: await Data.getUserInfo(req.cookies.session_id)});
});

router.post('/reg', async (req, res) => {
   console.log(req.body)
   Data.regUser(req.body.name, req.body.password)
   res.redirect('/login');
});

router.get('/contact', async (req, res) => {
   res.render('contact', { userInfo: await Data.getUserInfo(req.cookies.session_id)});
})

router.get('/about', async (req, res) => {
   res.render('about', { userInfo: await Data.getUserInfo(req.cookies.session_id)});
})

router.get('/oops', async (req, res) => {
   res.render('oops', { userInfo: await Data.getUserInfo(req.cookies.session_id)});
});

router.post('/newThread', (req, res) => {
   Data.addThread(req.body.message.value);
});

router.post('/delThread', (req, res) => {
   Data.delThread(req.body.message.value);
})

// router.use(function (req, res, next) {
//    if (req.cookies.session_id) {
//       next();
//    }
// })

// router.use(function (req, res, next) {
//    if (req.path !== '/oops') {
//       res.redirect('/oops');
//    } else {
//       next();
//    }
// });

module.exports = router;