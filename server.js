const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const session = require('express-session');
const store = session.MemoryStore();
const {loginRouter, logoutRouter, productsRouter, registerRouter, cartRouter, usersRouter} = require('./routes/index');
const {checkIfAuthenticated} = require('./controllers/login');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.options('*', cors());
app.enable("trust proxy", 1);
app.use(cookieParser());
app.use(helmet());
app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 1000*60*60, sameSite: 'none'},
    store,
}));

app.use(morgan('dev'));
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/products', checkIfAuthenticated, productsRouter);
app.use('/cart', checkIfAuthenticated, cartRouter);
app.use('/user', checkIfAuthenticated, usersRouter);


app.use((err, req, res, next) => {
    res.send(err.message);
});


app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
});
