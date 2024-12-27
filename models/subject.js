const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subject', {
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
    curriculum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'curriculum',
        key: 'id'
      }
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cycle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cycle',
        key: 'id'
      }
    },
    professional_module: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'professional_module',
        key: 'id'
      }
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'subject',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "subject_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
