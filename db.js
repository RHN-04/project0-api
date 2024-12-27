const Sequelize = require ('sequelize');
const seq = new Sequelize('document_database', 'postgres', 'rhn04', {
    host: 'localhost',
    dialect: 'postgres'
});

seq.authenticate()
    .then(() => console.log('Database connected!'))
    .catch (err => console.log('Error: ' + err))

const initModels = require("./models/init-models");
module.exports = initModels(seq);
