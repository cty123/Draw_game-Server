var UserProfile = require("./models/user");

exports = module.exports = function(io){
    // Implement socket.io functions
    io.on('connection', function(socket) {  
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
    
        socket.on('msg', function(data) {
            console.log(data)
        });
    
        socket.on('guess', function(data) {
            console.log(data)
        });

        console.log('Client connected...');
    });
}