const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lesson', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type_of_lesson: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    number_of_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    theme: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'theme',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'lesson',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "lesson_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
