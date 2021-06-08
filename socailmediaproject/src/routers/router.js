const express = require('express');
const multer = require('multer')
const path = require('path')
const router = new express.Router()
const controller = require('../controller/controller')
const authJwt = require('./verifyJwtToken')
let storage = multer.diskStorage({
     
    limits:{fileSize:1},
    destination: function(req , file , cb){  
        cb(null, path.join(__dirname, '../images/'))
    }
     ,
    filename:function(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|png)$/)){
            return cb(new Error('error'))
        }
      cb(null, Date.now()+'.'+file.originalname.split('.').pop())
    }
    
}) 
let upload = multer({storage})
router.post('/api/auth/signup' , controller.signUp)
router.post('/api/auth/signin' , controller.signin)

router.post('/api/test/user' , [authJwt.verifyToken] )
router.post('/api/test/admin' , [authJwt.verifyToken , authJwt.isAdmin] ,controller.adminBord)

router.post('/addpost'  , [authJwt.verifyToken] , upload.single('post'), controller.addPost)
router.get('/getalluserposts' , [authJwt.verifyToken] , controller.getAllUserPosts)
router.post('/updatepost' , [authJwt.verifyToken] , upload.single('post') ,controller.updatePost)
router.delete('/deletepost' , [authJwt.verifyToken] ,controller.deletePost)

router.get("/getpostwiththreecomments" , [authJwt.verifyToken] , controller.getPostwiththreecomments)
router.get("/getpostwithpaginationcomments" , [authJwt.verifyToken] , controller.getPostwithPaginationComments)
router.get('/getallpostscommentsnumber' , controller.getNumberOfComments)
router.post('/addcomment', [authJwt.verifyToken] , controller.addComment)

module.exports = router