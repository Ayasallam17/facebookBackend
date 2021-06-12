module.exports = (sequlize , Sequlize)=>{
    const post = sequlize.define('groupposts' , {
        content:{
            type:Sequlize.STRING,
            allowNull : true
        },
        imageurl:{
            type:Sequlize.STRING,
            allowNull:true
        },
        userId:{
            type:Sequlize.STRING,
            allowNull:false
        },
        // groupId:{
        //     type:Sequlize.STRING,
        //     allowNull:false
        // },

    })
    return post
}
