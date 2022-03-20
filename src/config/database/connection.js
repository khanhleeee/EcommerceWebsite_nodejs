const mongoose = require('mongoose');

async function connect() {
   try {
      await mongoose.connect('mongodb://localhost:27017/nodejs_jwrshop', {
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