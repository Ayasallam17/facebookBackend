const db = require('../config/db.config')
const env = require('../config/env')
const config = require('../config/config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.user
const Role = db.role
var Post = db.post
const sequelize = db.sequelize
const comment = db.comment
// const Op = db.Sequelize.Op
exports.getNumberOfComments = async (req , res)=>{ // use group by to get all posts commments number
    comment.findAll({
        attributes: ['postId', [sequelize.fn('count', sequelize.col('postId')), 'commentsNumber']],
        group: ['postId'],
    }).then(data =>{
    res.status(200).send({
        apistatus :true,
        data : data ,
        message :"get all comments number for all posts"  
    })
  })
}
exports.getPostwithPaginationComments = async (req , res)=>{
    try{
        //console.log(req.query.page)
        let limit = 1 // i decided limit  
        let offset = (req.query.page - 1) * limit
        await Post.findByPk(  req.body.id, {
            include: [{
                model : comment, 
                offset: offset ,
                limit: 1
            }] 
           // attributes : ["content" , "id"]
        }).then(posts=>{
            res.status(200).send({
                apistatus :true,
                data : posts ,
                message :"get post pagination comments limit"  
            })
        })
    }catch(err){
        res.status(400).send({
            apistatus :false,
            error : err.message ,
            message :"error "
        })
    }
}

exports.getPostwiththreecomments = async (req , res)=>{
    try{
        await Post.findByPk(  req.body.id, {
            include: [{
                model : comment,
                limit:3
            }] 
           // attributes : ["content" , "id"]
        }).then(posts=>{
            res.status(200).send({
                apistatus :true,
                data : posts ,
                message :"get post three comments"  
            })
        })
    }catch(err){
        res.status(400).send({
            apistatus :false,
            error : err.message ,
            message :"error "
        })
    }
}

exports.addComment = async(req , res)=>{
    try{ 
       // console.log(req.id)
    await comment.create({
        content : req.body.content,
        postId : req.query.id,
        userId : req.id
    })
    res.status(200).send({
        apistatus :true,
        data : "added comment" ,
        message :"added comment"  
    })
    }catch(err){
    res.status(400).send({
        apistatus :false,
        error : err.message ,
        message :"error in adding comment "
    })
}
}
exports.deletePost = async (req , res) =>{
    try{
        await Post.destroy({
            where: {
                id : req.query.id
            }
        }).then( ()=>{
            res.status(200).send({
                apistatus :true,
                data : `delete post number ${req.query.id}` ,
                message :"deleted post"  
                })
        } )
             

    }catch(err){
        res.status(400).send({
            apistatus :false,
            error : err.message ,
            message :"error in deleting post "
        })
    }
}
exports.updatePost = async (req , res)=>{
    try{
        await Post.findByPk( req.query.id ).then(async post=>{
            if(req.file != undefined){
                await post.update({
                    content: req.body.content,
                    imageurl : `${req.file.destination}/${req.file.filename}`
                }).then(post=>{
                    res.status(200).send({
                        apistatus :true,
                        data : post ,
                        message :"updated post successfuly"  
                    })
                })
            }
            await post.update({
                content: req.body.content
            }).then(post=>{
                res.status(200).send({
                    apistatus :true,
                    data : post ,
                    message :"update comment"  
                })
            })
            
        })
    }catch(err){
        res.status(400).send({
            apistatus :false,
            error : err.message ,
            message :"error in updating post "
        })
    }
}

exports.addPost = async (req , res)=>{
    console.log(req.file)
    try{
        if( req.body.content == null && req.file == undefined ){ 
            throw new Error("post can not be empty")
        }
        if(req.file == undefined){
            await Post.create({
            content:req.body.content,
            userId:req.id
            }).then(post=>{
                res.status(200).send({
                    apistatus :true,
                    data : post ,
                    message :"post added to user"  
                }) 
            })
            
        }
        if(req.file != undefined){ 
            await Post.create({
            content:req.body.content,
            userId:req.id,
            imageurl : `${req.file.destination}/${req.file.filename}`
        }).then(post=>{
            res.status(200).send({
                apistatus :true,
                data : post ,
                message :"post added to user"  
            })
        })
        }
         
    //console.log(post)
    }catch(err){
        res.status(400).send({
            apistatus :false,
            error : err.message ,
            message :"error in adding post"
        })
    }
}

exports.getAllUserPosts = async (req , res)=>{
    try{
        await Post.findAll({
            where:{
                userId:req.id
            },
           // attributes : ["content" , "id"]
        }).then(posts=>{
            res.status(200).send({
                apistatus :true,
                data : posts ,
                message :"all user posts"  
            })
        })
    }catch(err){
        res.status(400).send({
            apistatus :false,
            error : err.message ,
            message :"error in getting user posts"
        })
    }
}

exports.signUp =  async (req , res) => {
try{ 
    //const e = env.bcryptNum
    const user = await  User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password , env.bcryptNum)
    })
    //console.log(user)
    const roles = await Role.findAll({ //return array
        where:{
            name : req.body.roles
        }
    })
    await  user.setRoles(roles) 
    res.send({
        apistatus :true,
        data : user ,
        message :"user register successfuly"  
    })
    //console.log(roles)
}catch(e){
    res.status(400).send({
        apistatus :false,
        error : e.message ,
        message :"error in register "
    })
}
}

exports.signin = async (req , res)=>{

    User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('User Not Found.');
		}
        //console.log(user.password)
		var passwordIsValid =bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		
		var token = jwt.sign({ id: user.id }, config.secret 
		  // expiresIn: 86400 // expires in 24 hours
          );
		
		res.status(200).send({ auth: true, accessToken: token });
		
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

exports.adminBord = async (req , res)=>{
    User.findOne({
        where: { id : req.body.id },
        attributes : [ 'firstName' , 'lastName' ] ,
        include:[{
            model :Role,
            attributes : ['id' , 'name'],
            through : [ 'userId' , 'roleId' ]
        }]
    }).then(user=>{
       // console.log(user)
       res.status(200).send({
        apistatus : true,
        data : user ,
        message :" user is admin "
    })
    }).catch( err => {
        res.status(400).send({
            apistatus :false,
            error : err.message ,
            message :"not access not admin"
        })
    })
     
}