var express=require('express')
var path=require('path')
var exphbs=require('express-handlebars')
var flash=require('connect-flash')
var session=require('express-session')
var expressvalidator=require('express-validator')
var bodyparser=require('body-parser')
var passport=require('passport')

var auth=require('./auth')(passport)
var app=express()

app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}))
app.set('view engine','handlebars')
app.use(express.static(path.join(__dirname,'public')))
var index=require('./routes/index')
var users=require('./routes/users')

const cookieparser=require('cookie-parser')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookieparser())
app.use(express.json())
app.use(session({
  secret: 'cat',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(expressvalidator({
errorFormatter:function(param,msg,value){
var namespace=param.split('.'),
root=namespace.shift()
,formParam=root;
while(namespace.length){
formParam+='['+namespace.shift()+']';	
}	
return{
param:formParam,
msg:msg,
value:value
}
}	
}))
app.use(flash())
app.use(function(req,res,next){
res.locals.success_msg=req.flash("success_msg")
res.locals.error_msg=req.flash("error_msg")
res.locals.error=req.flash("error")	
res.locals.user=req.user||null
next()
})





app.use('/',index)
app.use('/users',users)

var port=3000
app.listen(port,function(){
	console.log('server started on port'+port)
})

