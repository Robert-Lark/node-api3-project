// code away!
const express = require("express")

const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
//const otherServer = require('./server')
const server = express()
const port = 4000



server.use(logger("long"))
server.use(express.json());

server.use(userRouter)
server.use("/:id/posts", postRouter)
//server.use(otherServer)



server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})