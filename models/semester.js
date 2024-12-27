const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('semester', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    lection_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    independent_work_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    individual_project_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    course_project_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    form_of_accessment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access_hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
    tableName: 'semester',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "semester_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
