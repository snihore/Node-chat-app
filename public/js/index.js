socket = io();

socket.on('connect', function(){
    console.log('Client is connect to a server ...');
});

socket.on('disconnect', function(){
    console.log('server is disconnected ...');
});

socket.on('newMessage', function(msg){
    // console.log('New Message:\n', msg);

    $('#msg_list').append(`<li>${msg.from} : ${msg.text}</li>`);
    $('#message').val('');
});

socket.on('newLocationMessage', function(msg){
    var a = $('<a target="_blank"></a>');
    a.attr("href", `${msg.url}`);
    a.append(`My Location`);
    var li = $(`<li>${msg.from}: </li>`);
    li.append(a);
    $('#msg_list').append(li);
});

$('#send_btn').click(function(event){
    event.preventDefault();

    var text = $('#message').val();
    socket.emit('createMessage', {
        from: 'User',
        text: text
    });
});

$('#location_send_btn').click(function(event){
    
    if(!navigator.geolocation){
        return alert("Your Browser doesn't support Geolocation");
    }

    navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position);
        socket.emit('createLocationMessage', {
            from: 'User',
            lat: position.coords.latitude,
            lon: position.coords.longitude
        });
    });
});



