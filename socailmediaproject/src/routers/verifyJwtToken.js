const jwt = require('jsonwebtoken')
const config = require('../config/config')
const db = require('../config/db.config')
const User = db.user

verifyToken = async (req , res , next)=>{
    
    const token =  req.header('Authorization').replace('Bearer ','')
    if(!token){
        return  res.status(400).send({
            apistatus : false,
            error : "no token provided" ,
            message :" user don not have token "
        })
    }
    const decodedToken = await jwt.verify(token, config.secret)
    //console.log(decodedToken)
    if(!decodedToken){
        return  res.status(400).send({
            apistatus : false,
            error : "can not auth token" ,
            message :"can not auth token"
        })
    }
    req.id = decodedToken.id
    next()
}
isAdmin = async (req , res ,next)=>{
    User.findByPk(req.id).then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					console.log(roles[i].name);
					if(roles[i].name.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}
				
				res.status(403).send({
                    apistatus : false,
                    error : "do not have access" ,
                    message :"require admin role"
                });
				return;
			})
		})
}
const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin
module.exports = authJwt