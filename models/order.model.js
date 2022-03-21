const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    userId: Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now
    },
    address: String,
    mobile: String,
    packages: [{
        packageId: Schema.Types.ObjectId,
        price: Number,
        qty: Number
    }],
    items: [{
        itemId: Schema.Types.ObjectId,
        price: Number,
        qty: Number
    }]
});

module.exports = mongoose.model("orders", orderSchema);