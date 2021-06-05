const db = require('../config/db.config')
const env = require('../config/env')
const config = require('../config/config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.user
const Role = db.role
const Op = db.Sequelize.Op

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
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		
		res.status(200).send({ auth: true, accessToken: token });
		
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
//     try{ 
//     //console.log("aaa")
//     console.log(req.body.password)
//     const user=  User.findOne({
//         where:{
//             email:req.body.email
//         }
//     }).then ( (user) =>{
//     console.log(user.dataValues.password)
//     passwordIsValid = bcrypt.compareSync(req.body.password , user.dataValues.password)
//     console.log(passwordIsValid)
//     if(! passwordIsValid){ 
//         throw new Error ("invalid password")
//     }
//     const token =  jwt.sign({id: user.dataValues.id} , "123")
//     console.log(token)
//     res.status(200).send({
//         apistatus:true , 
//         token : token,
//         message:"sign in successfully"
//     })
//     })
//      if(!user){ 
//         throw new Error("invalid email")
//     }
// }catch(e){
//     res.status(200).send({
//         apistatus:false , 
//         error : e.message,
//         message:"error in sign in"
//     })
// }

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