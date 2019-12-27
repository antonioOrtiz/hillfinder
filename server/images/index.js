var router = require('express').Router();
var Image = require('../models/Image');
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function(req, file, cb){
   cb(null, './server/uploads/');
  },
  filename: function(req, file, cb){
   cb(null, Date.now() + file.originalname)
  }
})

var fileFilter = (req, file, cb) => {
 if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  cb(null, true);
 } else {
  // rejects storing a file
  cb(null, false)
 }
}

var upload = multer({
 storage: storage,
 limits : {
  fileSize : 1024 * 1024 * 5
 },
 fileFilter: fileFilter
})

/*
stores image in uploads folder
using mulkter and creates a reference to the file
*/

router.route('/uploadmulter')
 .post(upload.single('imageData'), (req, res, next) => {
   console.log('req.body', req.body);
   var newImage = new Image({
    imageName: req.body.imageName,
    imageData : req.file.path
   })

   newImage.save()
   .then(result => {
    res.status(200).json({
      success: true,
      document:result
    })
   })
   .catch(err=> next(err))
  });

  module.exports = router
