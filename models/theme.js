const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('theme', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'unit',
        key: 'id'
      }
    },
    lection_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    lab_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    practice_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    independent_work_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'theme',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "theme_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
