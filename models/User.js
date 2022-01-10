const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Create our User Model
class User extends Model {

}

User.init( // initialize the model's data config
    {
        // TABLE COLUMN DEFINITIONS
        id: {
            type: DataTypes.INTEGER,  // from sequalize data types
            allowNull: false,
            primaryKey: true, // if not declared, auto setup for us
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // No duplicates allowed
            // if allowNull is set to false, we can run our data through validators before creating the table data (built it)
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // This means the password must be at least four characters long
            validate: {
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE
        // hooks are lifecycle events to call before or after sequalize events
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData){
                newUserData.password = await  bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize, // Import the sequelize connection
        timestamps: false, // dont create createdAt/updatedAt timestamp fields
        freezeTableName: false, // don't pluralize the databae table name
        underscored: true, // user underscore instead of camel case
        modelName: 'user'
    }
)

module.exports = User;