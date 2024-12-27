const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('professional_module', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'professional_module',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "professional_module_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
