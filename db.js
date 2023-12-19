const { Sequelize } = require('sequelize')
const { SequelizeStorage, Umzug } = require('umzug')

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

const runMigrations = async () => {
    try {
        const umzug = new Umzug({
            migrations: {
                glob: ['./migrations/20231219132651-create-user-table.js'],
                pattern: /\.js$/,
                params: [
                    sequelize.getQueryInterface(),
                    Sequelize
                ],
            },
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({ sequelize }),
            logger: console,
        });

        await umzug.up()

        console.log('Migrations executed successfully!')
    } catch (error) {
        console.error('Error executing migrations:', error)
    }
};

runMigrations();

module.exports = sequelize