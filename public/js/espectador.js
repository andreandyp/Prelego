const socket = io.connect("https://localhost:16562");

var webrtc = new SimpleWebRTC({
	localVideoEl: "local",
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
	texto.textContent = `${webrtc.config.nick}: ${mensajeChat}`;
	mensajeEl.appendChild(texto);
	document.querySelector("#chat").appendChild(mensajeEl);

	webrtc.sendDirectlyToAll("meta", "chateo", {
		mensaje: `${webrtc.config.nick}: ${mensajeChat}`
	});
}, false);

webrtc.on("channelMessage", (peer, label, data) => {
	if(data.type === "invitados") {
		let solicitud = qs("#solicitud");
		if(data.payload.aceptar){
			solicitud.disabled = false;
			solicitud.classList.add("is-success");
			solicitud.classList.remove("is-danger");
			solicitud.innerText = "¡Habla conmigo!";
		}
		else{
			solicitud.disabled = true;
			solicitud.classList.add("is-danger");
			solicitud.classList.remove("is-success");
			solicitud.innerText = "Espera a que el anfitrión acepte invitados";
		}
	} else if(data.type === "intervenir"){
		if(data.payload.usuario === webrtc.config.nick){
			webrtc = new SimpleWebRTC({
				localVideoEl: "local",
				autoRequestMedia: true,
				socketio: socket
			});
			webrtc.joinRoom(localStorage.getItem("sala"));
		}
	}
});

const solicitud = qs("#solicitud");
solicitud.addEventListener("click", () => {
	webrtc.sendDirectlyToAll("meta", "nuevo-invitado", {
		usuario: webrtc.config.nick
	});
}, false);

const modalApodo = qs("#modalApodo");
modalApodo.addEventListener("click", e => {
	e.preventDefault();
	qs(".modal").classList.remove("is-active");
	webrtc.config.nick = qs("#apodo").value;
	webrtc.joinRoom(localStorage.getItem("sala"));
}, false);

webrtc.on("videoAdded", video => {
	qs("#avisoRemoto").style.display = "none";
	qs("#remoto").appendChild(video);
});

webrtc.on("videoRemoved", () => {
	qs("#avisoRemoto").style.display = "block";
	qs("#remoto").removeChild(qs("#remoto").childNodes[1]);
});