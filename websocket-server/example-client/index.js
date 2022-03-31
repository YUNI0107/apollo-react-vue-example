// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080")

// Connection opened
socket.onopen = () => {
  console.log("open connection")
}

// Connection closed
socket.onclose = () => {
  console.log("close connection")
}

// Get Message
socket.onmessage = (event) => {
  console.log(event.data)
}
