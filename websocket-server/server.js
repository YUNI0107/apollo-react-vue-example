/**
 * Reference Article
 * https://medium.com/enjoy-life-enjoy-coding/javascript-websocket-%E8%AE%93%E5%89%8D%E5%BE%8C%E7%AB%AF%E6%B2%92%E6%9C%89%E8%B7%9D%E9%9B%A2-34536c333e1b
 */

const express = require("express")
const { Server } = require("ws")

const PORT = 8080

const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`))

const wss = new Server({ server })

wss.on("connection", (ws) => {
  // When wws connected, console info
  console.log("Client connected")

  const sendNowTime = setInterval(() => {
    ws.send(String(new Date()))
  }, 5000)

  ws.on("message", (data) => {
    // Get all connected client
    let clients = wss.clients

    // Loop，send message to all client
    clients.forEach((client) => {
      client.send(data)
    })
  })

  // When wws closed, console info
  ws.on("close", () => {
    console.log("Close connected")
  })
})
