var express=require('express')
var path=require('path')
var session=require('express-session')
var expressvalidator=require('express-validator')
var bodyparser=require('body-parser')
var passport=require('passport')
var auth=require('./auth')(passport)
var app=express()
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
//require('./passport')(passport)
var index=require('./routes/index')
var users=require('./routes/users')
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname,'public')))
const cookieparser=require('cookie-parser')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookieparser())
app.use(express.json())
app.use('/',index)
app.use('/users',users)

var port=3000
app.listen(port,function(){
	console.log('server started on port'+port)
})

