const mongoose = require("mongoose");
mongoose.pluralize(null);
const msgSchema = mongoose.Schema({
    email: String,
    name: String,
    message: String,
    creationDate:{ type: Date, default: Date.now()}    
});

const msgModel= mongoose.model("Messages",msgSchema);

module.exports = msgModel;