'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}

    Book.init({
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter the Book Title"
                },
                notEmpty: {
                    msg: "Please enter the Book Title"
                }
            }
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter the Author Name"
                },
                notEmpty: {
                    msg: "Please enter the Author Name"
                }
            }
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter the Book Genre"
                },
                notEmpty: {
                    msg: "Please enter the Book Genre"
                }
            }
        },
        year: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter the Year Published"
                },
                notEmpty: {
                    msg: "Please enter the Year Published"
                },
                isInt: {
                    msg: "Please enter an integer value for the Year Published"
                }
            }
        }
    }, { sequelize });

    return Book;
}