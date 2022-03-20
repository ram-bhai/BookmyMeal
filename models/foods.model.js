const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
        unique: true
    },
    foodImageUrl1: {
        type: String,
        required: true,
        unique: true
    },
    foodImageUrl2: {
        type: String,
        unique: true,
    },
    foodImageUrl3: {
        type: String,
        unique: true
    },
    foodPrice: {
        type: Number,
        required: true
    },

    foodQty: {
        type: Number,
        required: true,
        min: 1
    },
    foodDescription: {
        type: String,
        required: true
    },

    foodDiscount: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
}, { timestamps: true });

module.exports = mongoose.model("foods", foodSchema);