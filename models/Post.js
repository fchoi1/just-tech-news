const {Model, Datatypes, DataTypes} = require('sequelize');
const sequalize = require('../config/connection');

class Post extends Model {}

Post.init({
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {  // Foriegn key
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequalize, // Import connection to db
        freezeTableName: true,
        underscoredd: true,
        modelName: 'post'
    }
});

module.exports = Post;