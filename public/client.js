var socket = io.connect();
socket.on('connect', function() {
    console.log("Connected");
    socket.emit('newId', socket.id);
});

document.querySelector('body').addEventListener('touchstart', function(ev) {
  event.preventDefault();
});

var myElement = document.getElementById('myElement');

var mc = new Hammer(myElement);
mc.on("panleft panright panup pandown tap press", function(ev) {
	if(ev.type=="panleft") socket.emit('panleft', 1);
	if(ev.type=="panright") socket.emit('panright', 2);
		if(ev.type=="panup") socket.emit('panup', 3);
	if(ev.type=="pandown") socket.emit('pandown', 4);
	if(ev.type=="tap") socket.emit('tap', 5);
	if(ev.type=="press") socket.emit('press', 6);
	// socket.emit('tap', 5);
    myElement.textContent = ev.type +" gesture detected.";
});
