const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Comment = new Schema({
    userPoster: {
        userId: { type: Schema.Types.ObjectId, ref: 'Users' },
        userName: { type: String },
        userAva: { type: String },
    },
    productPoster: {
        productId: { type: Schema.Types.ObjectId, ref: 'Products' },
        productName: { type: String },
    },
    content: { type: String, maxLength: 255 },
    date: { type: String, default: new Date().toLocaleString() },
    isHide: { type: Boolean, default: false },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comments', Comment);