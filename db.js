var mongoose=require('mongoose')
//connect to the DB
mongoose.connect('mongodb://localhost:27017/userModel')
//mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
	console.log('connected')
})
.catch((err)=>{
	console.log(err)
})
var userschema=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		////validate:[isEmail,'please enter a valid Email']
	},
	password:{
		type:String,
		required:true//,'please enter password'],
	},
	date:{
		type:Date,
		default:Date.now
	}
})
var User=mongoose.model('users',userschema)
module.exports=User
