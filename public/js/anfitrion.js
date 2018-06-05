const socket = io("https://localhost:1337");

const webrtc = new SimpleWebRTC({
	localVideoEl: "local",
	remoteVideoEl: "",
	autoRequestMedia: false,
	socketio: socket
});

socket.on("chat", mensaje => {
	var mensajeEl = document.createElement("div");
	var texto = document.createElement("span");
	texto.textContent = mensaje;
	mensajeEl.appendChild(texto);
	document.querySelector("#chat").appendChild(mensajeEl);
});