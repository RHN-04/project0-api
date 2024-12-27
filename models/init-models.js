var DataTypes = require("sequelize").DataTypes;
var _curriculum = require("./curriculum");
var _cycle = require("./cycle");
var _education_level = require("./education_level");
var _lesson = require("./lesson");
var _professional_module = require("./professional_module");
var _semester = require("./semester");
var _source = require("./source");
var _specialty = require("./specialty");
var _subject = require("./subject");
var _theme = require("./theme");
var _unit = require("./unit");

function initModels(sequelize) {
  var curriculum = _curriculum(sequelize, DataTypes);
  var cycle = _cycle(sequelize, DataTypes);
  var education_level = _education_level(sequelize, DataTypes);
  var lesson = _lesson(sequelize, DataTypes);
  var professional_module = _professional_module(sequelize, DataTypes);
  var semester = _semester(sequelize, DataTypes);
  var source = _source(sequelize, DataTypes);
  var specialty = _specialty(sequelize, DataTypes);
  var subject = _subject(sequelize, DataTypes);
  var theme = _theme(sequelize, DataTypes);
  var unit = _unit(sequelize, DataTypes);

  subject.belongsTo(curriculum, { as: "curriculum_curriculum", foreignKey: "curriculum"});
  curriculum.hasMany(subject, { as: "subjects", foreignKey: "curriculum"});
  subject.belongsTo(cycle, { as: "cycle_cycle", foreignKey: "cycle"});
  cycle.hasMany(subject, { as: "subjects", foreignKey: "cycle"});
  specialty.belongsTo(education_level, { as: "education_level_education_level", foreignKey: "education_level"});
  education_level.hasMany(specialty, { as: "specialties", foreignKey: "education_level"});
  subject.belongsTo(professional_module, { as: "professional_module_professional_module", foreignKey: "professional_module"});
  professional_module.hasMany(subject, { as: "subjects", foreignKey: "professional_module"});
  curriculum.belongsTo(specialty, { as: "specialty_specialty", foreignKey: "specialty"});
  specialty.hasMany(curriculum, { as: "curriculums", foreignKey: "specialty"});
  semester.belongsTo(subject, { as: "subject_subject", foreignKey: "subject"});
  subject.hasMany(semester, { as: "semesters", foreignKey: "subject"});
  source.belongsTo(subject, { as: "subject_subject", foreignKey: "subject"});
  subject.hasMany(source, { as: "sources", foreignKey: "subject"});
  unit.belongsTo(subject, { as: "subject_subject", foreignKey: "subject"});
  subject.hasMany(unit, { as: "units", foreignKey: "subject"});
  lesson.belongsTo(theme, { as: "theme_theme", foreignKey: "theme"});
  theme.hasMany(lesson, { as: "lessons", foreignKey: "theme"});
  theme.belongsTo(unit, { as: "unit_unit", foreignKey: "unit"});
  unit.hasMany(theme, { as: "themes", foreignKey: "unit"});

  return {
    curriculum,
    cycle,
    education_level,
    lesson,
    professional_module,
    semester,
    source,
    specialty,
    subject,
    theme,
    unit,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
