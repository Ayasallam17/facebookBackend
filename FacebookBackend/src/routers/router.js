const express = require('express');
const multer = require('multer')
const path = require('path')
const router = new express.Router()
const controller = require('../controller/controller')
const authJwt = require('./verifyJwtToken')
const authAdmin = require('./verifyAdimOfGroup')
const authMember = require('./verifyMemberGroup')
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
router.use('/user', authJwt.verifyToken )
router.post('/api/auth/signup' , controller.signUp)
router.post('/api/auth/signin' , controller.signin)

router.post('/api/test/user' , [authJwt.verifyToken] )
router.post('/api/test/admin' , [authJwt.verifyToken , authJwt.isAdmin] ,controller.adminBord)

router.post('/user/addpost', upload.single('post'), controller.addPost)
router.get('/user/getalluserposts', controller.getAllUserPosts)
router.post('/user/updatepost', upload.single('post') ,controller.updatePost)
router.delete('/user/deletepost',controller.deletePost)

router.post('/user/sharepost' , controller.sharePost)

router.get("/user/getpostwiththreecomments" , controller.getPostwiththreecomments)
router.get("/user/getpostwithpaginationcomments", controller.getPostwithPaginationComments)
router.get('/user/getallpostscommentsnumber' , controller.getNumberOfComments)
router.post('/user/addcomment' , controller.addComment)

router.post('/user/creategroup' , controller.createGroup)
router.get('/user/getmygroup' , [authAdmin.verifyAdmin] , controller.getMyGroup)
router.get('/user/getwaitingposts' , [authJwt.verifyToken , authAdmin.verifyAdmin] , controller.getWaitingPosts)

router.post('/user/joingroup', controller.requestjoin)
router.get('/user/getjoinreq' , [authAdmin.verifyAdmin] , controller.getJoinRequests)
router.post('/user/approvejoin' , [authAdmin.verifyAdmin] , controller.approvejoin)
router.post('/user/rejectjoin' , [authAdmin.verifyAdmin] , controller.rejectJoin)
router.post('/user/addposttogroup' , [authMember.verifyMember ] , controller.addPostToGroup)
router.post('/user/approvepost' , [authAdmin.verifyAdmin] , controller.approvePost)
router.get('/user/getgrouphome' ,[authMember.verifyMember ] , controller.getGroupHome)


module.exports = router