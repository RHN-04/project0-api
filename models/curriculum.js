const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('curriculum', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    specialty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'specialty',
        key: 'id'
      }
    },
    groups: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'curriculum',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "curriculum_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
