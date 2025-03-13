const morgan = require('morgan');
const moviesRouter = require('./Routes/movieRouter');
const CustomError = require('./Utils/CustomError');
const globalErrorHandler = require('./Controllers/errorController');
const express = require('express');
const errorController = require('./Controllers/errorController');
let app = express();


app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.static('./public'));



app.use('/api/v1/movies', moviesRouter);
// app.use('/api/v1/users', authRouter);

app.all('*',(req, res,next)=>{
    const err = new CustomError(`Can't find ${req.originalUrl} on the server`, 404);
    next(err);
})

app.use(globalErrorHandler)

module.exports = app;