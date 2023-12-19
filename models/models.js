const sequelize = require('../db')
const { DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    balance: {
        type: DataTypes.INTEGER,
        required: true,
        default: 0,
        allowNull: false
    }
})

module.exports = { User }