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
		let mensajeEl = document.createElement("div");
		let texto = document.createElement("span");
		texto.textContent = data.payload.mensaje;
		mensajeEl.appendChild(texto);
		document.querySelector("#chat").appendChild(mensajeEl);
	}
	else if(data.type === "nuevo-invitado"){
		let usuario = crearEl("div");
		let boton = crearEl("button");
		boton.classList.add("button", "is-primary");
		boton.textContent = data.payload.usuario;
		usuario.appendChild(boton);
		qs("#remoto").appendChild(usuario);
	}
});

const modalSala = qs("#modalSala");
modalSala.addEventListener("click", e => {
	e.preventDefault();
	
	qs(".modal").classList.remove("is-active");
	webrtc.startLocalVideo();
}, false);

const aceptarInvi = qs("#aceptarInvitados");
aceptarInvi.addEventListener("click", () => {
	if(aceptarInvi.classList.contains("is-success")){
		webrtc.sendDirectlyToAll("meta", "invitados", {
			aceptar: true
		});
		aceptarInvi.classList.remove("is-success");
		aceptarInvi.classList.add("is-danger");
		aceptarInvi.innerText = "Cerrar acceso a invitados";
	}
	else{
		webrtc.sendDirectlyToAll("meta", "invitados", {
			aceptar: false
		});
		aceptarInvi.classList.add("is-success");
		aceptarInvi.classList.remove("is-danger");
		aceptarInvi.innerText = "Aceptar invitados";
	}
}, false);

webrtc.on("readyToCall", () => {
	console.log("readytocall");
	let anfitrion = localStorage.getItem("anfitrion");
	let sala = qs("#sala").value;
	socket.emit("nuevo-stream", anfitrion + "---" + sala);
	qs("#enlace").innerText = `https://prelego.herokuapp.com/ver/${anfitrion}/${sala}`;
	localStorage.setItem("sala-anfitrion", anfitrion+"---"+sala);
	webrtc.joinRoom(anfitrion + "---" + sala);
});