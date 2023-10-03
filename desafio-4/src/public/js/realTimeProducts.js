const socket = io()
socket.emit("message", "Comunicacion iniciada")

socket.on("productAdded", (product) => {
    // Crear un nuevo elemento HTML para el producto
    const nuevoElemento = document.createElement("div");
        nuevoElemento.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
    
    `;

    const contenedor = document.getElementById("productsContainer");
    contenedor.appendChild(nuevoElemento);
});