var router = require('express').Router();
var UserModel = require('../../models/UserModel');

router
  .route('/')
  .get()
  .post()

router
  .route('/:id')
  .get()
  .put()
  .delete()

return router

