const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favSchema = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    foodList: [{
        type: Schema.Types.ObjectId,
        ref: "foods"
    }],
}, { timestamps: true });

module.exports = mongoose.model("favourites", favSchema);