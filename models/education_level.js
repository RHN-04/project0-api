const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('education_level', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'education_level',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "education_level_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
