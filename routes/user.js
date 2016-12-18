var express = require("express")
var router = express.Router()
var models = require("../models")

module.exports = router

router.get("/", function(req,res){
    models.User.find({}, function(err, users){
        res.json(users)
    })
})