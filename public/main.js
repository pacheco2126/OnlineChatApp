var socket = io.connect('http://192.168.1.101:8081', {'forceNew' : true});

socket.on('mensajes', function(datos) {
    console.log(datos);
    renderizado(datos);
});


function renderizado(datos) {

    var html = datos.map(function(elem, index) {
        return(`<div>
                    <b>${elem.autor}</b>:
                    <em>${elem.texto}</em>
                </div>`
        )
    }).join(" ");

    document.getElementById("mensajes").innerHTML = html;
}

function nuevoMensaje(e) {
    var mensaje = {
        autor : document.getElementById('nombre').value,
        texto : document.getElementById('mensaje').value
    };

    socket.emit('nuevoMensaje', mensaje);
    return false;
}