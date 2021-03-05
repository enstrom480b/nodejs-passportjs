const localstrategy=require('passport-local').Strategy
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const passport=require('passport')
const User=require('./db.js')

module.exports=function(passport){

	

	passport.use(new localstrategy(function(username,password,done)
	{
		User.findOne({username:username},function(err,doc){
			if(err){done(err)}
			else{
				if(doc){
					var valid=doc.comparepassword(password,doc.password)
					if(valid)
					{
						return done(null,doc)
					}
				
					
				}
				else{
					done(null,false)
				}
				}
		
		})
		console.log(username,password)
	}))
	/*
	passport.serializeUser(function(user,done){
			done(user,user)
	})
	passport.deserializeUser(function(user,done){
				done(user,user)
	})
	*/
	passport.serializeUser(function(user,done){
			done(user,user.id)
	})	
	passport.deserializeUser(function(id,done){
		User.findById(id,function(err,user){
			done(err,user)
		})
	})

	
	
}