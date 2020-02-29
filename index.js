const http = require("http");

class TinEyeServer {
  constructor(port = 3000, publicKey = "", privateKey = "") {
    this.port = port || 3000;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.startServer();
  }

  startServer() {
    console.log("port ", this.port);
    this.sever = http.createServer(this.listener).listen(this.port, () => {
      console.log(`TinEye server listening on port ${this.port}`);
    });
  }

  listener(req, res) {
    console.log("body ", req.constructor, res.headers);
    const ip = res.socket.remoteAddress;
    const port = res.socket.remotePort;

    // res.writeHead(200, { "Content-Type": "application/json" });
    res.end(`Your IP address is ${ip} and your source port is ${port}.`);
  }
}

new TinEyeServer();
