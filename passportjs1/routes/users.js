var express=require('express')
var router=express.Router()
var passport=require('passport')
var localstrategy=require('passport-local').Strategy
var User=require('../user.js')
router.get('/register',function(req,res){
	
	res.render('register')
})

router.get('/login',function(req,res){
	
	res.render('login')
})

router.get('/login',function(req,res){
	
	res.render('login')
})

router.post('/register',function(req,res){
	
	
	var name=req.body.name
	var email=req.body.email
	var username=req.body.username
	var password=req.body.password
	var password2=req.body.password2
	
	
	var newUser=new User({
		name:name,
		email:email,
		username:username,
		password:password
	})
	User.createUser(newUser,function(err,user){
		if(err)
		throw err
		console.log(user,'success')
	})
	res.redirect('/users/login')
	
})
passport.use(new localstrategy(
function(username,password,done){
	User.getuserbyusername(username,function(err,user){
		if(!user){
			return done(null,false,{message:'unkown user'})
		}
		
	User.comparepassword(password,user.password,function(err,ismatch){
		
		if(err)throw err
		if(ismatch){
			return done(null,user)
		}else{
		return done(null,false,{message:'invalid password'})
			
		}
		
	})
	})
	
}))





passport.serializeUser(function(user,done){
			done(null,user.id)
})	
	passport.deserializeUser(function(id,done){
		User.getuserbyid(id,function(err,user){
			done(err,user)
})
})

router.post('/login',passport.authenticate('local',{
	successRedirect:'/',
	failureRedirect:'/users/login',
	function(req,res){
		res.redirect('/ideas')
	}
	
}))


module.exports=router