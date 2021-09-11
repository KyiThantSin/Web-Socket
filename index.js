let express = require("express");
let socket=require("socket.io")

/**app setup */
let app = express();

/**route setup */
let server = app.listen(4000,()=>{
    console.log("Project is running on localhost 4000");
});

/**server setup */
app.get("/",(res,req)=>{
    req.sendFile(__dirname + "/public/index.html");
});

/**socket setup */
let io = socket(server)
io.on('connection',(socket)=>{
    console.log("socket connection connected: " + socket.id);

    //catch data from client
    socket.on("chat",(data)=>{
        //send data to other clients
        io.sockets.emit("chat",data)
    })

    //typing event
    socket.on("typing",(name)=>{
        socket.broadcast.emit("typing",name)
    })
});
