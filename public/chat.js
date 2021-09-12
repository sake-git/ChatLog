const socket = io();
let id= document.getElementById("name").innerText;
let email= document.getElementById("email").innerText;
console.log("ID:"+id + "  Email: " + email);

socket.emit(id, id +" connected to Server");

function sendMsg(){
    let chat = document.getElementById("chat");
    socket.emit("chat1",{data:chat.value,name:id,email:email});
    chat.value="";
}

socket.on("chat1",(msg)=>{
console.log(msg);
let elemP = document.createElement("p");
let textP = document.createTextNode( msg.data);
elemP.appendChild(textP);
if(msg.name == id){
    elemP.innerHTML= "<b style='color:green'>"+msg.name+ '</b>:' + elemP.innerHTML;
}
else{
    elemP.innerHTML= "<b style='color:red'>"+msg.name+ '</b>:' + elemP.innerHTML;
}
let chatdiv= document.getElementById("chatLog");
chatdiv.appendChild(elemP);  
})

function download(){
    fetch("http://localhost:8000/api/log/chatlog")
    .then(res => res.text())
    .then(data => {
        console.log(data)
        var file = new Blob([data],{type:"text"});
        //saveAs(blob,"chatlog.txt");
        window.open(URL.createObjectURL(file));
    });
}