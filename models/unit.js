const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unit', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    number: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    subject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subject',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'unit',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unit_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
