// server.js

const http = require("http");
const flights = ["A123", "D654", "U213", "A987", "I768", "G119"]
const states = ["happy", "sad", "angry"]
http
  .createServer((request, response) => {
    console.log("Requested url: " + request.url);

    if (request.url.toLowerCase() === "/events") {
      response.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Access-Control-Allow-Origin": "*",
      });

      setInterval(() => {
        const flight = flights[Math.floor(Math.random() * flights.length)]
        const state = states[Math.floor(Math.random() * states.length)]

        response.write(`data: {"flight": "${flight}", "state": "${state}"}`);
        response.write("\n\n");
      }, 500);
    } else {
      response.writeHead(404);
      response.end();
    }
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000/");
  });
