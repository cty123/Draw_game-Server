var UserProfile = require("./models/user");

exports = module.exports = function(wss){
    var rooms = [];

    const handle_create_room = function() {
        
    }

    const handle_join_room = function() {

    }

    const handle_leave_room = function() {

    }

    // Implement socket.io functions
    wss.on('connection', function(socket) {  
        socket.on('start', function(data){
            // Check if the user is the owner

            // Check if there's other users in the group

            // if can start -- start -- emit message

                // Look at room list, assign acting player

                // Count down 60s
            
                // Emit end round 

                // Assign new word -- emit -- assign new acting player

                // ...

                // Till no acting player availabel

                // Reset acting player status

                // Emit end game -- back to room
                
            // if cann't start -- emit error message
            io.sockets.clients();
        });
    
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
                case 'create_room':
                    socket.send(JSON.stringify({
                        res: "OK"
                    }));
                case 'join':

                case 'start':

                case 'draw':
            }
        });

        socket.send("Welcome");
        console.log('Client connected...');
    });
}