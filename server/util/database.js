const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
})

module.exports = {
    sequelize
}

//Create a new instance of the Sequelize class, passing in the database connection string and a configuration object.
//The configuration object should have a dialect property whose value is “postgres”.
//Export sequelize.