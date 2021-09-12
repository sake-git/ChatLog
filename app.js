const express = require("express");
const app = express();
const http = require("http").Server(app);
let io = require("socket.io")(http);
const cors = require("cors");
let router = require("./router/userRoute");
let msgRouter = require("./router/msgRouter");
let saveMsg = require("./controller/msgController");
const mongoose = require ("mongoose");
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.engine("html",require("ejs").renderFile);
app.set("view engine","html");

let url = "mongodb://localhost:27017/mean";

mongodbOptions= {
}

let connect = mongoose.connect(url,mongodbOptions).then(
    res=>{
        console.log("Database connected");
    }
).catch(err=>{
    console.log(err);
});


app.use("/api/user",express.static("public"));
app.use("/api/user",router);
app.use("/",router);
app.use("/api/log",msgRouter);

io.on("connection",socket=>{
    socket.on("chat1",(msg)=>{
        console.log(msg);
        io.emit("chat1",msg);
        saveMsg.saveChatMsg(msg);
    })
});

http.listen(8000,()=>{console.log("server running on port 8000")});
