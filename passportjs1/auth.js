var express=require('express')
var router=express.Router()
var User=require('./db.js')
module.exports=function(passport)
{
	router.post('/signup',function(req,res){
		var body=req.body
		username=req.body.username
		password=req.body.password
		console.log(req.body)
		User.findOne({username:username},function(err,doc){
			if(err)
			{
				res.status(500).send('err occured')
			}
			else{
				if(doc)
				{
				res.status(500).send('username already exists')
				}
				else{
					
					var record=new User()
						record.username=username
						record.password=record.hashPassword(password)
						record.save()
						.then(idea=>{
							res.json(record)
						})
					
						}
					
					  
				}	
		})
		
	})
	
	router.post('/login',passport.authenticate('local',{
		
		failureRedirect:'/login',
		successRedirect:'/ideas'
	}))
	return router
}