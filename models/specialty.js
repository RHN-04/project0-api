const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('specialty', {
    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    qualification: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    education_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'education_level',
        key: 'id'
      }
    },
    profile: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'specialty',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "specialty_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
