const { date } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Comment = new Schema({
    userPoster: {
        userId: { type: Schema.Types.ObjectId, ref: 'Users' },
        userName: { type: String },
        userAva: { type: String},
    },
    productId: { type: Schema.Types.ObjectId, ref: 'Products' },
    content: { type: String, maxLength: 255 },
    date: { type: String, default: new Date().toLocaleString() },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comments', Comment);