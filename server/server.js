﻿#!/usr/bin/env node

/**
 * Module dependencies.
 */
const fs = require("fs");
const debug = require("debug")("WebTemplateStudioExpress:server");
const https = require("https");
const app = require("./app");
const CONSTANTS = require("./constants");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(CONSTANTS.PORT);
app.set("port", port);

/**
 * Create HTTP server.
 */

const privateKey = fs.readFileSync('/etc/letsencrypt/live/juliangerritsen.nl/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/juliangerritsen.nl/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/juliangerritsen.nl/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const server = https.createServer(credentials, app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
