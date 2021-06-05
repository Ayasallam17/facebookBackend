// const { DataTypes , Model} = require('sequelize');
// const db = require('../dbconnection/db')
// sequelize = db.sequelize       // to pass connection object

// class User extends Model{}

//     user=  User.init({
//         userId:{
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement:true,
//             allowNull:false
//         },
//         firstName: {
//         type:DataTypes.STRING(10),
//         allowNull:false,
//         },
//         lastName:{
//             type:DataTypes.STRING(10),
//             allowNull: false
//         },
//         email:{
//             type:DataTypes.STRING(15),
//             allowNull: false
//         },
//         password:{
//             type:DataTypes.STRING(15),
//             allowNull: false
//         },
//         imageUrl:{
//             type:DataTypes.STRING(15),
//             allowNull: true
//         },
//         token:{
//             type:DataTypes.STRING(50)
//         }

//     },{ 
//         sequelize , modelName:'User'
//         }
//     )
// // generateToken(){
    
// // }

module.exports = (sequelize , Sequelize)=>{
    const User = sequelize.define('users' , {
            firstName: {
            type:Sequelize.STRING(10),
            allowNull:false,
            },
            lastName:{
                type:Sequelize.STRING(10),
                allowNull: false
            },
            email:{
                type:Sequelize.STRING(15),
                allowNull: false
            },
            password:{
                type:Sequelize.STRING(100),
                allowNull: false
            },  
            imageUrl:{
                type:Sequelize.STRING(100),
                allowNull: true
            }
    })
    return User
}