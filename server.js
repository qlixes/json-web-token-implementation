var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var morgan = require("morgan")
var mongoose = require("mongoose")
var path = require("path")
var jwt = require("jsonwebtoken")
var config = require("./config")


mongoose.connect(config.database)
app.use(express.static(path.join(__dirname + "/public")))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(morgan("dev"))


app.get("/", function (req, res) {
    res.send("Hello")
})

var routes = require("./routes")
var middlewares = require("./middlewares")

app.use("/api", routes.auth)

app.use(middlewares.token)
app.use("/api", routes.user)

app.listen(process.env.PORT)

console.log("App start")
