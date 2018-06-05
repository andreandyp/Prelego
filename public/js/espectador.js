const socket = io.connect("https://localhost:1337");

const webrtc = new SimpleWebRTC({
	localVideoEl: "local",
	remoteVideoEl: "",
	autoRequestMedia: false,
	socketio: socket
});

qs(".modal").classList.add("is-active");

const enviarMsj = qs("#enviarMsj");
enviarMsj.addEventListener("click", e => {
	e.preventDefault();

	const mensajeChat = qs("#mensaje").value;
	qs("#mensaje").value = "";

	var mensajeEl = document.createElement("div");
	var texto = document.createElement("span");
	texto.textContent = `${localStorage.getItem("apodo")}: ${mensajeChat}`;
	mensajeEl.appendChild(texto);
	document.querySelector("#chat").appendChild(mensajeEl);

	webrtc.sendDirectlyToAll("meta", "chateo", {
		mensaje: `${localStorage.getItem("apodo")}: ${mensajeChat}`
	});
}, false);

webrtc.on("channelMessage", (peer, label, data) => {
	if (data.type === "chateo") {
		var mensajeEl = document.createElement("div");
		var texto = document.createElement("span");
		texto.textContent = data.payload.mensaje;
		mensajeEl.appendChild(texto);
		document.querySelector("#chat").appendChild(mensajeEl);
	}
});

const solicitud = qs("#solicitud");
solicitud.addEventListener("click", () => {
	let datosSolicitud = {
		sala: localStorage.getItem("sala"),
		usuario: localStorage.getItem("apodo")
	};
	socket.emit("solicitud", datosSolicitud);
});

const modalApodo = qs("#modalApodo");
modalApodo.addEventListener("click", () => {
	localStorage.setItem("apodo", qs("#apodo").value);
	qs(".modal").classList.remove("is-active");
	webrtc.joinRoom(localStorage.getItem("sala"));
}, false);