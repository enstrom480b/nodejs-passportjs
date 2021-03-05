var mongoose=require('mongoose')
var bcrypt=require('bcrypt-nodejs')
//connect to the DB
mongoose.Promise=global.Promise
mongoose.connect('mongodb://localhost/passportdb',{
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
})

userschema.methods.hashPassword=function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
userschema.methods.comparepassword=function(password,hash){
	return bcrypt.compareSync(password,hash)
}
const User=mongoose.model('user',userschema)

module.exports=User
