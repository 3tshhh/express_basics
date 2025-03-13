const mongoose = require('mongoose');
const env = require('dotenv');
env.config({path: './config.env'});


const app = require('./app');

mongoose.connect(process.env.CONN_STR, {
}).then(()=>{
    console.log('db connection successful');
}).catch((error)=>{
    console.log('error has occured', error);
    
})


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('localhost:', port);
})