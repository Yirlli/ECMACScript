const username = document.querySelector('.username')
const chatMessage = document.querySelector('.chat')
const inpuMessage = document.querySelector('.text')
const btnMessage = document.querySelector('.btn')
const socket = io()

btnMessage.addEventListener('click', (e) =>{
    e.preventDefault()
    socket.emit('userMessage', {message : inpuMessage.value})
        })

Swal.fire({
    title: 'Ingrese su nombre',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'on'
    },
    showCancelButton: false,
    confirmButtonText: 'Ingresar',
    
  }).then((result)=>{
    username.textContent= result.value
    socket.emit('userConnection', {user : result.value})
        })

        const messageInnerHTML = (data) => {
            let message = "";
          
            for (let i = 0; i < data.length; i++) {
              if (data[i].info === "connection") {
                message += `<p class="connection">${data[i].message}</p>`;
              }
              if (data[i].info === "message") {
                message += `
                  <div class="messageUser">
                      <h5>${data[i].name}</h5>
                      <p>${data[i].message}</p>
                  </div>
                  `;
              }
            }
          
            return message;
          };
socket.on("userConnection", (data)=>{
    chatMessage.innerHTML = "";
  const connection = messageInnerHTML(data);
  chatMessage.innerHTML = connection;
})

socket.on("userMessage", (data)=>{
    chatMessage.innerHTML = "";
  const message = messageInnerHTML(data);
  chatMessage.innerHTML = message;

})
inpuMessage.addEventListener("keypress", () => {
    socket.emit("typing", { nameUser });
  });
  
  const typing = document.querySelector(".typing");
  socket.on("typing", (data) => {
    typing.textContent = `${data.nameUser} escribiendo...`;
  });

  