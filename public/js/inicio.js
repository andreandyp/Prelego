document.querySelector("#ir").addEventListener("click", e => {
	e.preventDefault();
	let anfi = document.querySelector("#anfitrion").value;
	let sala = document.querySelector("#sala").value;
	window.location.href = `https://localhost:1337/ver/${anfi}/${sala}`;
}, false);

qs("#comenzar").addEventListener("click", e => {
	e.preventDefault();
	
	let nuevo = qs("#nuevo").value;
	window.location.href = `https://localhost:1337/transmitir/${nuevo}/`;
})