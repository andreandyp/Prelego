const express = require("express"),
	path = require("path"),
	bodyParser = require("body-parser"),
	fs = require("fs");

const app = express();

//Consigue tus propios certificados SSL si quieres probar en localhost
//Es necesario para usar WebRTC
var opciones = {};
if(process.env.NODE_ENV !== "production"){
	opciones = {
		key: fs.readFileSync("./certificados/server.key"),
		cert: fs.readFileSync("./certificados/server.crt")
	};
}

const https = require("https").createServer(opciones, app);
const io = require("socket.io")(https);

const port = process.env.PORT || 1337;
app.set("port", port);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index"));
app.get("/transmitir", (req, res) => {
	res.render("anfitrion", {});
});
app.get("/ver/:usuario/:sala", (req, res) => {
	res.render("espectador", {sala: req.params.usuario+"---"+req.params.sala});
});

io.on("connection", socket => {
	console.log("Nuevo cliente");
	socket.on("chat", mensaje => io.emit("chat", mensaje));

	socket.on("prueba", mensaje => {
		console.log("mensaje recibido: " + mensaje);
		socket.broadcast.emit("respuesta", "También con socket");
	});
});
https.listen(port, () => console.log(`Servidor iniciado en https://localhost:${port}/`));