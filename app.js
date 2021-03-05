var express=require('express')
var path=require('path')
var session=require('express-session')
var expressvalidator=require('express-validator')
var bodyparser=require('body-parser')
const passport=require('passport')
require('./passport')(passport)
const cookieparser=require('cookie-parser')
const localstrategy=require('passport-local').Strategy
var app=express()
var auth=require('./auth')(passport)
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookieparser())

app.use(express.json())
app.use(session({
	secret:'thesecret',
	saveUnitiliazed:false,
	resave:false
}))
require('./passport')(passport)
app.use(passport.initialize())
app.use(passport.session())


//global variables
app.locals.errors=null;
//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
//set public folder
app.use(express.static(path.join(__dirname,'public')))
//var authroute=require('./auth.route.js'

app.get('/signup',(req,res)=>{
	
	res.render('signup')
})

app.get('/login',(req,res)=>{

	res.render('login')
})
app.get('/ideas',(req,res)=>{

	res.render('ideas')
})
app.use('/auth',auth)

var port=3000
app.listen(port,function(){
	console.log('server started on port'+port)
})
//express messages



