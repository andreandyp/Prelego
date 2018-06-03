const express = require("express"),
	path = require("path"),
	bodyParser = require("body-parser");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 1337;
app.set("port", port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/demo", (req, res) => res.sendFile(path.join(__dirname, "demo.html")));

io.on("connection", socket => {
	console.log("Nuevo cliente");

	
	//Emitir video a los demás participantes
	socket.on("cuadro", video => {
		console.log(typeof video);
		socket.broadcast.emit("otros", video);
	});
	//Enviar solicitud a emisor
	socket.on("solicitud", mensaje => io.emit(mensaje));
	//Enviar mensaje de solicitud aceptada
	socket.on("confirmacion", mensaje => io.emit(mensaje));
	//Enviar video a conferencista
	socket.on("enviar-video", mensaje => io.emit(mensaje));
	socket.on("disconnect", () => console.log("Cliente desconectado"));

	socket.on("prueba", mensaje => {
		console.log("mensaje recibido: " + mensaje);
		socket.broadcast.emit("respuesta", "También con socket");
	});
});
http.listen(port, () => console.log(`Servidor iniciado en http://localhost:${port}/`));