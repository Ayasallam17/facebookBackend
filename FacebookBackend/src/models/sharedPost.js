module.exports = (sequlize , Sequlize)=>{
    const post = sequlize.define('sharedposts' , {
        postId:{
            primaryKey : true,
            type:Sequlize.INTEGER
        },
        userId:{
            type:Sequlize.INTEGER,
            allowNull:false
        }
    })
    return post
}