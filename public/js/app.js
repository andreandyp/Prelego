var webrtc = new SimpleWebRTC({
	localVideoEl: "conferencista",
	remoteVideoEl: "",
	autoRequestMedia: true
});

webrtc.on("readyToCall", () => webrtc.joinRoom("prueba"));
webrtc.on("videoAdded", function (video, peer) {
	console.log("video added", peer);
	var invitado = document.getElementById("invitado");
	var d = document.createElement("div");
	d.className = "videoContainer";
	d.id = "container_" + webrtc.getDomId(peer);
	d.appendChild(video);
	video.onclick = function () {
		video.style.width = video.videoWidth + "px";
		video.style.height = video.videoHeight + "px";
	};
	invitado.appendChild(d);
});



/*
const socket = io();
document.querySelector("#prueba").addEventListener("click", () => socket.emit("prueba", "Hey qué pedo carnal"), true);
socket.on("respuesta", mensaje => alert("Respuesta: "+mensaje));*/