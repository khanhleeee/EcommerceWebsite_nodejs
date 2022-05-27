const { date } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Comment = new Schema({
    content: { type: String, maxLength: 255 },
    date: { type: String, default: new Date() },
    imgPoster: { type: String }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comments', Comment);