let msgController = require("../controller/msgController");
let app = require("express");
let router = app.Router();

router.get("/chatlog",msgController.chatlog);

module.exports = router ;
