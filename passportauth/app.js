var express=require('express')
var path=require('path')
var session=require('express-session')
var expressvalidator=require('express-validator')
var bodyparser=require('body-parser')
const passport=require('passport')
require('./passport')(passport)
const { nextTick } = require('process')
const cookieparser=require('cookie-parser')
const localstrategy=require('passport-local').Strategy
var app=express()
var morgan=require('morgan')
var createerr=require('http-errors')
require('dotenv').config()
var User=require('./db.js')
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookieparser())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
//global variables
app.locals.errors=null;
//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
//set public folder
app.use(express.static(path.join(__dirname,'public')))
var authroute=require('./auth.route.js')
app.use(authroute)


var port=3000
app.listen(port,function(){
	console.log('server started on port'+port)
})
//express messages



