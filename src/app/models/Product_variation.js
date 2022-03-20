const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Product_variation = new Schema({
   p_id: {type:String,  ref: 'Products'},
   vari_title: {type:String, maxlength: 100},
   vari_image: {type:String, ref: 'Images'},
   vari_color: {type:String, ref: 'Colors'},
   vari_size: {type:String, ref: 'Sizes'},
   SKU: {type:String, ref: 'Skus'}
})

module.exports = mongoose.model('Product_variations', Product_variation);