'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
              validate: {
                len: {
                    args: [1]
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1]
                }
            }
        },
        credits: {
            type: DataTypes.INTEGER,
            defaultValue: 1000
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return User;
};
