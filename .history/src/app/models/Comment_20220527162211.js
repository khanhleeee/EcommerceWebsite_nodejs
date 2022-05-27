const { date } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Comment = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    content: { type: String, maxLength: 255 },
    date: { type: String, default: new Date().toLocaleString() },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comments', Comment);