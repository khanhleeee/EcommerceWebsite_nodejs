const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Sku = new Schema({
   quantity: {type:String, maxlength: 100},
})

module.exports = mongoose.model('Skus', Sku);