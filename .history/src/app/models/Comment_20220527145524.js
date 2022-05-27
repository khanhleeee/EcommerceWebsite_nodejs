const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Comment = new Schema({
    content: { type: String, maxLength: 255 },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comments', Comment);