const express = require("express")
const app = express()

require("./startup/routes")(app)

const port = '5555'
const  server=app.listen(port, ()=>
{
    console.log("Listening to the port 5000")
})


module.exports = server