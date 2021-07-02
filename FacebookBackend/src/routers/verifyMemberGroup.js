const db = require('../config/db.config')
const member = db.groupMembers

exports.verifyMember = async (req , res , next)=>{
    console.log(req.id)
    await member.findOne({
        where:{
           userId : req.id
        }
    }).then(()=>{
        next()
    }).catch(err=>{
        res.status(403).send({
            apistatus : false,
            error : err ,
            message :"require to be member to group"
        });
    })
}