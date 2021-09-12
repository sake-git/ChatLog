let express = require("express");
let router =  express.Router();
let userController = require("../controller/userController");

router.post("/register",userController.register);
router.post("/logon",userController.logon);
router.get("/login",userController.login);
router.get("/",userController.login);
router.get("/index",userController.index);

module.exports =  router;