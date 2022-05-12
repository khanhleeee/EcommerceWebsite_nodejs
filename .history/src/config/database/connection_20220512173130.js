const mongoose = require('mongoose');

async function connect() {
   try {
      await mongoose.connect('mongodb+srv://mkhanhle:Mkhanhle2001@cluster0.5zop3.mongodb.net/JelweryShop', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log('Connected');
   }
   catch(err) {
      console.log('Failed')
   }
} 

module.exports = {connect};