var mongoose=require('mongoose')
var bcrypt=require('bcryptjs')
//connect to the DB
mongoose.connect('mongodb://localhost/loginapp',{useNewUrlParser:true,useUnifiedTopology:true})
//mongoose.connect(process.env.MONGODB_URL)

var userschema= mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true//,'please enter password'],
	},
	email:{
		type:String
	},
	name:{
		type:String
	}
})


const User=mongoose.model('users',userschema)
module.exports=User
module.exports.createUser=function(newUser,callback){
	bcrypt.genSalt(10,function(err,salt){
		bcrypt.hash(newUser.password,salt,function(err,hash){
			newUser.password=hash
			newUser.save(callback)
		})	
})
}

module.exports.getuserbyusername=function(username,callback){
	var query={username:username}
	User.findOne(query,callback)
}

module.exports.getuserbyid=function(id,callback){
	User.findById(id,callback)
}

module.exports.comparepassword=function(candidatepass,hash,callback){
	
	bcrypt.compare(candidatepass,hash,function(err,ismatch){
		
		if(err)throw err
		callback(null,ismatch)
	})
}


