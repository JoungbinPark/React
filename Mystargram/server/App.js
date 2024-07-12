const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
app.set('port', process.env.PORT || 5000);
dotenv.config();

app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/upimg', express.static(path.join(__dirname, 'uploads')));
app.use('/', express.static(path.join(__dirname, 'images')));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));       // 쿠키 사용
app.use(session({
    resave: false, saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie:{httpOnly:true, secure:false,},
}));

const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

const memberRouter = require('./routers/member');
app.use('/member', memberRouter);

app.get('/', (req,res)=>{res.send('<h1>MystarGram</h1>')})

app.listen(app.get('port'), ()=>{console.log(app.get('port'), 'port Server Open...')});
