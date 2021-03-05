var mongoose=require('mongoose')
var bcrypt=require('bcrypt-nodejs')
//connect to the DB
mongoose.Promise=global.Promise
mongoose.connect('mongodb://localhost/loginapp',{
	useMongoClient:true
})
//mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
	console.log('connected')
})
.catch((err)=>{
	console.log(err)
})
var userschema=new mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true//,'please enter password'],
	}
	email:{
		type:String
	},
	name:{
		type:String
	}
})


const User=mongoose.model('user',userschema)

module.exports.createUser=function(newuser,callback){
	bcrypt.genSalt(10,function(err,salt){
		bcrypt.hash(newuser.password,salt,function(err,hash){
			newuser.password=hash
			newuser.save(callback)
			
		})
		
	})
	
	
}