module.exports = (sequlize , Sequlize)=>{
    const comment = sequlize.define('comments' , {
        content:{
            type:Sequlize.STRING,
            allowNull : false
        },
        userId:{
            type:Sequlize.INTEGER,
            allowNull : false
        }
    })
    return comment
}