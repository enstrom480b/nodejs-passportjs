const express=require('express')
const createHttpError = require('http-errors')
const router=express.Router()
const auth=require('./controllers/authcontroller')

router.get('/signup',auth.signup_get)

router.post('/signup',auth.signup_post)

router.get('/login',auth.login_get)

router.post('/login',auth.login_post)

router.get('/ideas',auth.ideas)
module.exports=router