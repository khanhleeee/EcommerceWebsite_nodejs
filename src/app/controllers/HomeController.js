class homeController {
   
   //[GET] /
   showIndex(req, res, next) {
      res.render('home');
   }  
}

module.exports = new homeController;