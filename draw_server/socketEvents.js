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

    // Implement socket.io functions
    wss.on('connection', function(socket) {  

        socket.on('join', function(data){
            // Check if the room exist

            // if exist

                // Boardcast the members in the room -- emit message

                // Add the user to the room -- emit message

                // Add in database
                
            // if not -- emit error message
            console.log(data);
        });
    
        socket.on('create_room', function(data) {
            // Check if the room already exist

            // Assign current user as room owner
            console.log(data);
        });
    
        socket.on('draw', function(data) {
            io.sockets.emit('draw', data);
            console.log("draw: " + data);
        });
        
        socket.on('message', function incoming(message) {
            console.log("received: " + message);
            const data = JSON.parse(message);
            type = data["type"];
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
                        room_broadcast("testing", "Start", "Game Started");
                        rooms["testing"].forEach(player => {
                            console.log(rooms["testing"].length);
                            player.send(JSON.stringify({
                                res: "Acting User",
                                msg: "It's your turn to draw"
                            }));
                        });
                    //});
                    break;
                case 'time_out':
                    break;
                case 'draw':
                    break;
                case 'guess':
                    break;
            }
        });

        socket.send("Welcome");
        console.log('Client connected...');
    });
}