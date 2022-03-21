const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const packageSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    qunatity: Number,
    day: String,
    catId: Schema.Types.ObjectId
});

module.exports = mongoose.model("packages", packageSchema);