const e = require('express');
const mongoosse = require('mongoose');
const validator = require('validator');

const userSchema = new mongoosse.Schema({
    name: {
        type: String,
        required: [  true, 'please enter your name'],
    },
    email: {
        type: String,
        required:[  true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [  true, 'password is required'],
        minlength: 8
    },
    rePassword: {
        type: String,
        required: [  true, 'rePassword is required'],
    },
    photo: String,
});

const user = mongoosse.model('User', userSchema);

module.exports = user;