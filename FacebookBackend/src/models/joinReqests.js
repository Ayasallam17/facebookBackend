module.exports = (sequlize , Sequlize)=>{
    const req = sequlize.define('joinrequests' , {
        userId:{
            type: Sequlize.INTEGER,
            primaryKey: true,
            autoIncrement: true ,
            allowNull:false
        }
    })
    return req
}