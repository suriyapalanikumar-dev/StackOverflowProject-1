const  mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, 
  },
  username:{
    type: String,
    default:null,
  },
  reputation:{
    type:Number
  },
  profileURL:{
    type:String
  },
  memberFrom:{
    type:Date,
    default:Date.now,
  },
  lastSeen:{
    type:Date
  },
  location:{  
    type:String
  },
  questionIds:{
    type:[String]
  },
  answerIds:{
    type:[String]
  }
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};
module.exports = mongoose.model('User',UserSchema)