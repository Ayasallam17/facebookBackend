const db = require('../config/db.config')
const Group = db.group

exports.verifyAdmin = async (req , res , next)=>{
    console.log(req.id)
    await Group.findOne({
        where:{
           userId : req.id
        }
    }).then(data=>{
        req.groupId = data.dataValues.id
        next()
    }).catch(err=>{
        res.status(403).send({
            apistatus : false,
            error : err ,
            message :"require admin role"
        });
    })
}