const msgModel = require("../model/messageModel");

function saveChatMsg(msg){
    let msgDoc = new msgModel({
        email: msg.email,
        name: msg.name,
        message: msg.data
    });

    msgDoc.save();
}

chatlog= (req,res)=>{
    msgModel.find({},(err,doc)=>{
        if(!err){
            console.log(doc);
            let file="";
            doc.forEach(element => {
                file= file + new Date(element.creationDate).toString()+' | '+ element.name+": " + element.message+"\n";
               // element.creationDate=new Date(element.creationDate).toString();
            });
            return res.send(file);
        }
    });
}

module.exports = { saveChatMsg, chatlog};


