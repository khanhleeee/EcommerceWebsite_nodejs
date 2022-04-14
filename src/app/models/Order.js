const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Order = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    orderStatus: { type: String, maxLength: 255 },
    orderAmount: { type: Number, default: 0 },
    orderTracker: { type: String, maxLength: 255 },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Products' },
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Orders', Order);