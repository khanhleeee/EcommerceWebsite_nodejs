const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Color = new Schema({
    title: { type: String },
    color_code: { type: String }
})

module.exports = mongoose.model('Colors', Color);