const mongoose=require("mongoose");
const bycrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    fullname:{
      firstname:{
        type:String,
        required:true,
        minlength:[3,'first name must be at least 3 characters long'],
      },
      lastname:{
        type:String,
        minlength:[3,'last name must be at least 3 characters long'],
      },
    },
      email:{
        type:string,
        required:true,
        unique:true,
        minlength:[5,'email must be at least 5 characters long'],
      },
      password:{
        type:String,
        required:true,
        select:false
      },
      socketId:{
        type:String,
      }
    })


userSchema.methods.generateAuthToken=function(){
  const token=jwt.sign(
    { _id:this._id},
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return token;
}


userSchema.comparePassword=async function(enteredPassword){ 
  return await bycrypt.compare(enteredPassword,this.password);
}

userSchema.static.hashPassword=async function(password){
  return await bycrypt.hash(password,10);
}

const userModel=mongoose.model("User",userSchema);

module.exports=userModel;