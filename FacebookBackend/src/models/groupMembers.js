module.exports = (sequlize , Sequlize)=>{
    const member = sequlize.define('groupMember' , {
        userId:{
            type: Sequlize.INTEGER,
            primaryKey: true,
            autoIncrement: true ,
            allowNull:false
        }
    })
    return member
}