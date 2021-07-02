
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
db.sharedPost = require('../models/sharedPost') (sequelize , Sequelize)
db.group = require('../models/Group')(sequelize , Sequelize)
db.groupPost = require('../models/groupPosts')(sequelize , Sequelize)
db.waitingPost = require('../models/waitingPosts')(sequelize , Sequelize)
db.joinReqests =  require('../models/joinReqests')(sequelize , Sequelize)
db.groupMembers =  require('../models/groupMembers')(sequelize , Sequelize)

db.role.belongsToMany( db.user , { through: "user_roles", foreignKey: "roleId" , otherKey : "userId" } )
db.user.belongsToMany( db.role , { through: "user_roles", foreignKey: "userId" , otherKey : 'roleId' } )

db.user.hasMany(db.post)
db.post.belongsTo(db.user , { foreignKey:'userId' })

db.post.hasMany(db.comment)
db.comment.belongsTo( db.post , {  foreignKey : 'postId' } )

db.user.hasMany(db.sharedPost)
db.sharedPost.belongsTo( db.user , { foreignKey : "userId" } )

db.group.hasMany(db.joinReqests)
db.joinReqests.belongsTo( db.group , { foreignKey : "groupId" } )

db.group.hasMany(db.groupMembers)
db.groupMembers.belongsTo( db.group , { foreignKey : "groupId" } )


db.group.hasMany(db.groupPost)
db.groupPost.belongsTo( db.group , { foreignKey : "groupId" } )

db.group.hasMany(db.waitingPost)
db.waitingPost.belongsTo( db.group , { foreignKey : "groupId" } )


module.exports = db;