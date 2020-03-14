const express = require('express');
const app = express();
const socketio = require('socket.io')
const cookieParser = require('cookie-parser');
let namespaces = require('./data/namespaces');
const cors = require('cors');
const path = require('path')
// console.log(namespaces[0]);
app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(9000);
const io = socketio(expressServer);
app.use(cors())
app.use(cookieParser())
// app.get("/",async (req,res)=>{
//     console.log(req.cookies)
//     await res.cookie("usman maqbool","ajdshaiuofefasdfjsdfuoiehfasdfhoheoifhdskdjhfiuaeewfh")
//     res.status(200).json({
//         message:req.cookies
//     })
// })

app.use(express.static(path.join(__dirname, '/client/build')))

app.get('/',async(req, res) => {
    console.log(req.cookies)
    console.log("/asdkuajshdks")
    // await res.cookie("usman maqbool", "ajdshaiuofefasdfjsdfuoiehfasdfhoheoifhdskdjhfiuaeewfh")
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// io.on = io.of('/').on = io.sockets.on
// io.emit = io.of('/').emit = io.sockets.emit
io.on('connection', (socket) => {
    let nsData = namespaces.map((ns) => {
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    socket.emit('nsList', nsData);
})


// loop through each namespace and listen for a connection
namespaces.forEach((namespace) => {
    // const thisNs = io.of(namespace.endpoint)
    let joinRoom;
    io.of(namespace.endpoint).on('connection', (nsSocket) => {

        nsSocket.on('sendroomdata', (data, cb) => {
            console.log(data)
            // cb(namespace.rooms)
            nsSocket.emit("nsRoomLoad", namespace.rooms)
        })


        nsSocket.on("joinRoom", (roomToJoin, cb) => {
            joinRoom = roomToJoin;
            nsSocket.join(roomToJoin.room, (err) => {
                if (err) {
                }
                else {
                    io.of(roomToJoin.namespace).in(roomToJoin.room).clients((err, clinetsList) => {
                        // cb(clinetsList.length);
                        nsSocket.emit("updateroommember", clinetsList.length)
                    })
                }
            })
        })
        nsSocket.on("newMessageToServer", (msg) => {
            const fullmsg = {
                text: msg.text,
                time: Date.now(),
                username: "usman",
                avatar: "https://ui-avatars.com/api/?name=Usman+Maqbool&size=50"
            }
            console.log(msg)
            console.log("==>>", nsSocket.rooms)
            const roomTitle = Object.keys(nsSocket.rooms);
            console.log(roomTitle[1])
            io.of(namespace.endpoint).to(roomTitle[1]).emit('messageToClient', fullmsg);
        })


        nsSocket.on("disconnect", () => {
            // console.log("nssockets disconnected",namespace)
            nsSocket.leaveAll();
            namespace.rooms.forEach(room => {
                io.of(namespace.endpoint).in(room.namespace).clients((err, clinetsList) => {
                    // cb(clinetsList.length);
                    nsSocket.emit("updateroommember", clinetsList.length)
                })

            })
            // console.log(namespace);
        })

        // console.log(nsSocket.handshake)
        // const username = nsSocket.handshake.query.username;
        // // console.log(`${nsSocket.id} has join ${namespace.endpoint}`)
        // // a socket has connected to one of our chatgroup namespaces.
        // // send that ns gorup info back
        // nsSocket.emit('nsRoomLoad',namespace.rooms)
        // nsSocket.on('joinRoom',(roomToJoin,numberOfUsersCallback)=>{
        //     // deal with history... once we have it
        //     console.log(nsSocket.rooms);
        //     const roomToLeave = Object.keys(nsSocket.rooms)[1];
        //     nsSocket.leave(roomToLeave);
        //     updateUsersInRoom(namespace, roomToLeave)
        //     nsSocket.join(roomToJoin)
        //     // io.of('/wiki').in(roomToJoin).clients((error, clients)=>{
        //     //     console.log(clients.length)
        //     //     numberOfUsersCallback(clients.length);
        //     // })
        //     const nsRoom = namespace.rooms.find((room)=>{
        //         return room.roomTitle === roomToJoin;
        //     })
        //     nsSocket.emit('historyCatchUp', nsRoom.history)
        //     updateUsersInRoom(namespace, roomToJoin);
        // })keyrname,
        //         avatar: 'https://via.placeholder.com/30'
        //     }
        //     // console.log(fullMsg)
        //     // Send this message to ALL the sockets that are in the room that THIS socket is in.
        //     // how can we find out what rooms THIS socket is in?
        //     // console.log(nsSocket.rooms)
        //     // the user will be in the 2nd room in the object list
        //     // this is because the socket ALWAYS joins its own room on connection
        //     // get the keys
        //     const roomTitle = Object.keys(nsSocket.rooms)[1];
        //     // we need to find the Room object for this room
        //     const nsRoom = namespace.rooms.find((room)=>{
        //         return room.roomTitle === roomTitle;
        //     })
        //     // console.log("The room object that we made that matches this NS room is...")
        //     // console.log(nsRoom)
        //     nsRoom.addMessage(fullMsg);
        //     io.of(namespace.endpoint).to(roomTitle).emit('messageToClients',fullMsg)
        // })
    })
})

function updateUsersInRoom(namespace, roomToJoin) {
    // Send back the number of users in this room to ALL sockets connected to this room
    io.of(namespace.endpoint).in(roomToJoin).clients((error, clients) => {
        // console.log(`There are ${clients.length} in this room`);
        io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers', clients.length)
    })
}
