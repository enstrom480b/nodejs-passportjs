const User=require('../db.js')
const cookie=require('cookie-parser')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const passport=require('passport')
const maxage=3*24*60*60
module.exports.signup_get= (req,res)=>{
    res.render('signup')
}
module.exports.signup_post= (req,res)=>{
	const newuser=new User({
		name:req.body.name,
		email:req.body.email,
		password:req.body.password
	})
	User.findOne({email:req.body.email})
	.then(user=>{
		if(user){
			//req.flash('err_msg','email already registered');
			console.log('failure')
			res.redirect('/signup')
			
			}
	})
	bcrypt.genSalt(10,(err,salt)=>{
		bcrypt.hash(newuser.password,salt,(err,hash)=>{
			if(err)
			throw err
			newuser.password=hash
			newuser.save()
			.then(user=>{
				res.redirect('/login')
				console.log('success')
			})
			.catch(err)
			{
				console.log(err)
	
			}
		})
	})
	console.log(newuser)
}
module.exports.login_get=(req,res)=>{
    res.render('login')
}
module.exports.login_post=(req,res,next)=>{
	passport.authenticate('local',{
		successRedirect:'/ideas',
		failureRedirect:'/login'
	})(req,res,next)
}


module.exports.ideas=(req,res)=>{
    res.render('home')
}
 

