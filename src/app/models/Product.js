const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
   name:{type: String},
   category:{type: String},
   gender:{type: String},
   price: {type: String},
   skus: [
      {
        sku:{type: String, unique: true},
        img:{type: String},        
        color:{
           title: {type: String},
           color_code: {type: String}
        },
        sizes:[{size:{type: String}, qty:{type: String}}]
      }
    ]
})

module.exports = mongoose.model('Products', Product);