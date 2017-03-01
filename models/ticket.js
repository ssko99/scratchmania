'use strict';
module.exports = function(sequelize, DataTypes) {
    var Ticket = sequelize.define('Ticket', {
        first_number: DataTypes.INTEGER,
        second_number: DataTypes.INTEGER,
        third_number: DataTypes.INTEGER,
        fourth_number: DataTypes.INTEGER,
        fifth_number: DataTypes.INTEGER,
        winner: DataTypes.BOOLEAN

    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Ticket;
};
