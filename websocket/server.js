const WebSocket = require('ws');

// Create a standalone WebSocket server on port 5000
const wss = new WebSocket.Server({ port: 5000 }, () => {
  console.log("WebSocket server running on ws://localhost:5000");
});

// Handle connections
wss.on('connection', (ws) => {
  console.log("Client connected");

  // Handle incoming messages
  ws.on('message', (message) => {
    const parsed = JSON.parse(message);
    console.log("Received:", parsed.message);

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ fromServer: parsed.message }));
      }
    });

    // Optionally echo back to sender as well
    ws.send(JSON.stringify({ fromServer: parsed.message }));
  });

  ws.on('close', () => {
    console.log("Client disconnected");
  });
});
