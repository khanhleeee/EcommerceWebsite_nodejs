const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Promotion = new Schema({
    stt: { type: String, maxLength: 255 },
    makm: { type: String, maxLength: 255 },
    tenkm: { type: String, maxLength: 255 },
    giakm: { type: String, maxLength: 255 },
    ngayapdung: { type: String, maxLength: 255 },
    ngayhethan: { type: String, maxLength: 255 },
    motakm: { type: String, maxLength: 255 },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Promotions', Promotion);