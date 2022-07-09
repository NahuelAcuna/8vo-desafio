let username = localStorage.getItem('username')
if (username == null) {
    username = prompt('Ingrese username')
    localStorage.setItem('username', username)
}
if (username) {
    document.getElementById('username').innerHTML = `!Bienvenido ${username}!`
}

const loadProd = document.getElementById('loadProd')
const sendComm = document.getElementById('sendComm')
const socket = io()

loadProd.onclick = e => {
    e.preventDefault() 

    const name = document.getElementById('name').value
    const price = document.getElementById('price').value

    socket.emit('add', {name, price})
}

sendComm.onclick = e => {
    e.preventDefault() 

    const msn = document.getElementById('msn').value

    socket.emit('chat-in', { msn, username})
}

socket.on('show', () => {
    //console.log(products)
    fetch('/products')
        .then(r => r.text())
        .then(html => {
            //console.log(html)
            const div = document.getElementById('products')
            div.innerHTML = html
        })
        .catch(e => alert(e))
    
})

socket.on('chat-out', () => {
    fetch('/comments')
        .then(r => r.text())
        .then(html => {
            const div = document.getElementById('chat')
            div.innerHTML = html
        })
        .catch(e => alert(e))
    
})