const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const path = require("path");

let register = async (req,res)=>{

    const existingUser = await userModel.findOne({email:req.body.email});
    if(existingUser){
        return res.render(path.resolve(__dirname,'..')+"\\index.html",{errorDis:"User Already exists"});
    }

    let salt =  await bcryptjs.genSalt(10);
    console.log("body:", req.body);
    let encrptedPwd = await bcryptjs.hash(req.body.password,salt);

    let user = new userModel({
        userId: req.body.userId, 
        password: encrptedPwd,
        fname: req.body.fname,
        lname: req.body.lname,
        email:req.body.email
    }); 

    user.save((err,doc)=>{
        if(!err){
            res.render(path.resolve(__dirname,'..')+"\\login.html",{errorDis:" "});
        }
        else{
            res.render(path.resolve(__dirname,'..')+"\\index.html",{errorDis:err});
        }
    });
}

let login = async (req,res)=>{
     res.render(path.resolve(__dirname,'..')+"\\login.html",{errorDis:" "});
}

let logon = async (req,res)=>{
    userModel.findOne({userId:req.body.userId},async(err,user)=>{
        if(!err){
            if(user){
                let validPassword = await bcryptjs.compare(req.body.password,user.password);
                if(!validPassword){
                    res.render(path.resolve(__dirname,'..')+"\\login.html",{errorDis:"Invalid credentials"});
                }
                else{
                    payload = {_id:user._id,userId:user.userId}
                    let token = jwt.sign(payload,"secretKey");
                    res.render(path.resolve(__dirname,'..')+"\\chat.html",{name:user.fname,email:user.email});
                }
            }
            else{
                res.render(path.resolve(__dirname,'..')+"\\login.html",{errorDis:"Please signup! User not enrolled."});
            }
        }
        else{
            res.render(path.resolve(__dirname,'..')+"\\login.html",{errorDis:err});
        }
    });    
}

let index = async (req,res)=>{  
    res.render(path.resolve(__dirname,'..')+"\\index.html",{errorDis:" "});
}

module.exports = { register, login, logon, index };

