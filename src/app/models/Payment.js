const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Payment = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    paymentStatus: { type: String, maxLength: 255 },
    paymentType: { type: String, maxLength: 255 },
    name: { type: String, maxLength: 255 },
    phonenumber: { type: String, maxLength: 255 },
    address: { type: String, maxLength: 255 },
    note: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Payments', Payment);