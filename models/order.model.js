const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    orderItem: [{
        productId: Schema.Types.ObjectId,
        productName: String,
        qty: Number,
        amount: Number
    }],

    delieveryAddress: {
        type: String,
        required: true,
    },

    contactNumber: {
        type: Number,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('orders', orderSchema);