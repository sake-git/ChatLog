const mongoose = require("mongoose");
mongoose.pluralize(null);
const userSchema = mongoose.Schema({
    userId:{ type:String, unique:true}, 
    password:String,
    fname:String,
    lname:String,
    email:{ type:String, unique:true}, 
    creationDate: { type: Date, default: Date.now()}
});

const userModel = mongoose.model("Account",userSchema);

module.exports = userModel ;