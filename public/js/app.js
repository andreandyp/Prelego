var webrtc = new SimpleWebRTC({
	localVideoEl: "conferencista",
	remoteVideoEl: "invitado",
	autoRequestMedia: true
});

webrtc.on("readyToCall", () => webrtc.joinRoom("prueba"));

const socket = io();

document.querySelector("#prueba").addEventListener("click", () => socket.emit("prueba", "Hey qué pedo carnal"), true);

socket.on("respuesta", mensaje => alert("Respuesta: "+mensaje));