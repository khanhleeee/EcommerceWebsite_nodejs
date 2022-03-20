module.exports = {
   mongooseToObject: function(mongoose) {
      return mongoose ? mongoose.toObject():mongoose
   },

   multipleToObject: function(mongooses) {
      return mongooses.map(mongoose => mongoose.toObject())
   }
}

