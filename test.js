require('dotenv').config()
var vault = require("node-vault")(vaultOptions);
var ns = 'secret/nodejs-vault-demo';
var vaultOptions = {
  apiVersion: 'v1', // default
  endpoint: '${vault_url}',
  token: '${vault_token}'
};

// Init vault server, but only if not already initialized
vault.initialized()
.then((result) => {
  console.log(result);
  return vault.init({ secret_shares: 1, secret_threshold: 1 });
})
.then((result) => {
  console.log(result);
  vault.token = result.root_token;
  const key = result.keys[0];
  return vault.unseal({ secret_shares: 1, key });
})
.then((result) => {
  console.log(result);
  return vault.write(ns, { message: 'Hello World' });
})
.catch((err) => console.error(err.message));
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
    console.log(`Server running at http://${hostname}:${port}/${vault_url}`);
});
