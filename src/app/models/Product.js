const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
   p_title: {type:String, maxlength: 100},
   cat_id: {type: Schema.Types.ObjectId, ref: 'Categories'},
   image_id: {type: Schema.Types.ObjectId, ref: 'Images'},
   p_price: {type:String},
   p_variations: [
      { pv_id: {type:Schema.Types.ObjectId, ref: 'Product_variations'}}
   ]
})

module.exports = mongoose.model('Products', Product);