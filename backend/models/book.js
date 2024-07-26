const db = require('../db/database');
const Sequelize = require('sequelize');

const Book = db.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
});

module.exports = Book;