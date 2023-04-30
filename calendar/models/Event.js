const mongoose = require("mongoose");
//Event schema
const Schema = mongoose.Schema;

let eventSchema = new Schema ({
    username: {type: String},
    event: {type:String},
    date: {type:String},
    disc: {type:String},

});

module.exports = mongoose.model("events", eventSchema);
