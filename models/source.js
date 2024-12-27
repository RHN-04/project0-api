const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('source', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    year_of_publishing: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    source_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_main: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    subject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subject',
        key: 'id'
      }
    },
    number_of_copy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'source',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sources_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
