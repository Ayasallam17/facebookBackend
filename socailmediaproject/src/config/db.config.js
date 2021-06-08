
const Sequelize = require('sequelize');
const env = require('./env')
const sequelize = new Sequelize(env.database , env.username , env.password , {
    host: env.host,
    dialect : env.dialect,
    pool:{
        max : env.pool.max,
        min: env.pool.min,
        idle :env.pool.idle,
        acquire:env.pool.acquire
    },
    define:{
        timestamps:false
    }
})

const db = {}
db.sequelize = sequelize
db.Sequelize= Sequelize

db.user = require('../models/user')(sequelize , Sequelize)
db.role = require('../models/role')(sequelize , Sequelize)
db.post = require('../models/post')(sequelize , Sequelize)
db.comment = require("../models/comment")(sequelize , Sequelize)

db.role.belongsToMany( db.user , { through: "user_roles", foreignKey: "roleId" , otherKey : "userId" } )
db.user.belongsToMany( db.role , { through: "user_roles", foreignKey: "userId" , otherKey : 'roleId' } )

db.user.hasMany(db.post)
db.post.belongsTo(db.user , { foreignKey:'userId' })

db.post.hasMany(db.comment)
db.comment.belongsTo( db.post , {  foreignKey : 'postId' } )

module.exports = db;