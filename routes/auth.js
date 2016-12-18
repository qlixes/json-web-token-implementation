var express = require("express")
var router = express.Router()
var models = require("../models")
var jwt = require("jsonwebtoken")
var config = require("../config")
module.exports = router

router.get("/authenticate", function(req,res){
    res.send("Authenticate")
})
router.post("/authenticate", function (req, res) {
    models.User.findOne({
        name: req.body.name
    }).lean().exec(function (err, user) {
        if (err) throw err
        if (!user) return res.json({
            success: false,
            message: "Authentication failed. User not found"
        })
        if (user.password != req.body.password) return res.json({
            success: false,
            message: "Authentication failed. Wrong password."
        })

        var token = jwt.sign(user, config.secret, {
            expiresIn: 1440
        })
        res.json({
            success: true,
            message: "Enjoy your token!",
            token: token
        })
    })
})
