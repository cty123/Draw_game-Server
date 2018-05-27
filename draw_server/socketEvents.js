var UserProfile = require("./models/user");
var Room = require("./models/room");
var sleep = require('sleep');

exports = module.exports = function(wss){

    const handle_create_room = function() {
        
    }

    const handle_join_room = function() {

    }

    const handle_leave_room = function() {

    }

    const room_broadcast = function(room_name, broadcast_type, broadcast_msg) {
        rooms[room_name].forEach(sock => {
            sock.send(JSON.stringify({
                res: broadcast_type,
                msg: broadcast_msg
            }));
        });
    }

    const room_broadcast_others = function(socket, room_name, broadcast_type, broadcast_msg) {
        rooms[room_name].forEach(sock => {
            if (socket != sock) {
                sock.send(JSON.stringify({
                    res: broadcast_type,
                    msg: broadcast_msg
                }));
            }
        });
    }

    var rooms = [];

    wss.on('close', function close() {
        console.log('disconnected');
    });

    // Implement socket.io functions
    wss.on('connection', function(socket) {
        
        socket.on("error", (err) => {
            console.log("Caught flash policy server socket error: ")
            console.log(err.stack)
        });
        
        socket.on('close', function close(){
            console.log('disconnected');
        });

        socket.on('message', function incoming(message) {
            console.log("received: " + message);
            const data = JSON.parse(message);
            var type = data["type"];
            switch (type) {
                case 'join':
                    const room_name = data["room_name"];
                    rooms[room_name].push(socket);
                    socket.send(JSON.stringify({
                        res: "Room joined"
                    }));
                    console.log(rooms[room_name]);
                    break;
                case 'leave':
                    break;
                case 'create_room':
                    const new_name = data["room_name"];
                    rooms[new_name] = [];
                    rooms[new_name].push(socket);
                    socket.send(JSON.stringify({
                        res: "Room created"
                    }));
                    break;
                case 'broadcast':
                    const room = data["room_name"];
                    const message = data["message"];
                    rooms[room].forEach(sock => {
                        if (sock != socket){
                            sock.send(JSON.stringify({
                                type: "broadcast",
                                msg: message
                            }));
                        }
                    });
                    break;
                case 'get_friend':
                    room_broadcast("testing", "Test", "");
                    break;
                case 'start':
                    /* Check starting status
                    const user = data["user"];
                    Room.findOne()
                    .populate('owner')
                    .populate('members')
                    .then(room => {
                        if (!room) {
                            sock.send(JSON.stringify({
                                res: "Failed",
                                msg: "Room not found, something went wrong"
                            }));
                        }
                        if (room.owner.name != user){
                            socket.send(JSON.stringify({
                                res: "Failed",
                                msg: "The acting user is not the owner of the room"
                            }));
                        }
                        if (room.members.length < 2) {
                            socket.send(JSON.stringify({
                                res: "Failed",
                                msg: "You need 2 or more players to play the game"
                            }));
                        }
                        */
                        let start_room = data["room_name"]; 
                        room_broadcast(start_room, "Start", "Game Started");
                        rooms[start_room]["player"] = 0;
                        rooms[start_room][0].send(JSON.stringify({
                            res: "Acting User",
                            msg: "It's your turn to draw"
                        }));
                    //});
                    break;
                case 'time_out':
                    let num = ++rooms["testing"]["player"];
                    if (num == rooms["testing"].length) {
                        room_broadcast("testing", "Game Over", "Game Over");
                    }else {
                        rooms["testing"][num].send(JSON.stringify({
                            res: "Acting User",
                            msg: "It's your turn to draw"
                        }));
                        room_broadcast_others("testing", "Next Round", "Next Round");
                    }
                    break;
                case 'draw':
                    draw_room = data["room_name"];
                    let start_x = data["start_x"];
                    let start_y = data["start_y"];
                    let end_x = data["end_x"];
                    let end_y = data["end_y"];
                    rooms[draw_room].forEach(player => {
                        if (player != socket) {
                            player.send(JSON.stringify({
                                "room_name": draw_room,
                                "res": "draw",
                                "start_x": start_x,
                                "start_y": start_y,
                                "end_x": end_x,
                                "end_y": end_y
                            }));
                        }
                    });
                    break;
                case 'guess':
                    break;
            }


        });

        socket.send("Welcome");
        console.log('Client connected...');
    });
}