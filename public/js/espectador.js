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

	socket.emit("chat", `Andy: ${mensajeChat}`);
}, false);

socket.on("chat", mensaje => {
	var mensajeEl = document.createElement("div");
	var texto = document.createElement("span");
	texto.textContent = mensaje;
	mensajeEl.appendChild(texto);

	qs("#chat").appendChild(mensajeEl);
	qs("#chat").scrollTop = qs("#chat").scrollHeight;
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
	localStorage.setItem("apodo", qs("#modalApodo").value);
	qs(".modal").classList.remove("is-active");
}, false);