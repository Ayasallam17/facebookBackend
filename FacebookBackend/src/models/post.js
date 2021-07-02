module.exports = (sequlize , Sequlize)=>{
    const post = sequlize.define('posts' , {
        content:{
            type:Sequlize.STRING,
            allowNull : true
        },
        imageurl:{
            type:Sequlize.STRING,
            allowNull:true
        }
    })
    return post
}

