const mongoose = require("mongoose");
//ToDo schema
const Schema = mongoose.Schema;

let todoSchema = new Schema ({
    username: {type: String},
    todos: {type:String}

});

module.exports = mongoose.model("todos", todoSchema);
