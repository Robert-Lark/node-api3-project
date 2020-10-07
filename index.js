// code away!
const express = require("express")

const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");
const server = express()
const port = 4000



server.use(logger("long"))
server.use(express.json());

server.use(userRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})