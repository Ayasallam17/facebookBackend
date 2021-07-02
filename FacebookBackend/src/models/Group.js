module.exports = (sequlize , Sequlize)=>{
    const Group = sequlize.define('groups' , {
        name:{
            type:Sequlize.STRING,
            allowNull : false
        },
        description:{
            type:Sequlize.STRING,
            allowNull:true
        },
        status:{
            type:Sequlize.STRING,
            allowNull:true
        },
        userId:{
            type:Sequlize.STRING,
            allowNull:false
        }
    })
    return Group
}
