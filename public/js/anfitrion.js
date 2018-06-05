const socket = io("https://localhost:1337");

const webrtc = new SimpleWebRTC({
	localVideoEl: "local",
	remoteVideoEl: "",
	autoRequestMedia: false,
	socketio: socket
});

qs(".modal").classList.add("is-active");

webrtc.on("channelMessage", (peer, label, data) => {
	if(data.type === "chateo") {
		var mensajeEl = document.createElement("div");
		var texto = document.createElement("span");
		texto.textContent = data.payload.mensaje;
		mensajeEl.appendChild(texto);
		document.querySelector("#chat").appendChild(mensajeEl);
	}
});

const modalSala = qs("#modalSala");
modalSala.addEventListener("click", () => {
	let anfitrion = localStorage.getItem("anfitrion");
	let sala = qs("#sala").value;
	webrtc.joinRoom(anfitrion+"---"+sala);
	socket.emit("nuevo-stream", anfitrion+"---"+sala);
	qs(".modal").classList.remove("is-active");
	qs("#enlace").innerText = `https://prelego.herokuapp.com/ver/${anfitrion}/${sala}`;
	console.log("Anfitrión sala: " + anfitrion+"---"+sala);
	//webrtc.startLocalVideo();
}, false);