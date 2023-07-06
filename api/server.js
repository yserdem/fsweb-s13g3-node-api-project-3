const express = require('express');
const server = express();
server.use(express.json());

const userRouter = require("./users/users-router");
const mw = require("./middleware/middleware");
server.use(mw.logger)

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

server.use("/api/users", userRouter)

module.exports = server;
