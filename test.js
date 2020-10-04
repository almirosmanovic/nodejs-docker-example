
require('dotenv').config()
const http = require('http');

// Read the host address and the port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;
const msg = process.env.MSG;
// Return JSON regardless of HTTP method or route our web app is reached by
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(`{"message": ${msg}}`);
});

// Start a TCP server listening for connections on the given port and host
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
