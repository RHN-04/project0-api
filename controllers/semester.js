const models = require('../db');

exports.findSemesters = async () => {
    try {
      const semesters = await models.semester.findAll();
      return { success: true, semesters };
    } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.createSemester = async (body) => {
    try {
      await models.semester.create(body);
  
      return { success: true, message: 'Semester successfully added' };
    } catch (error) {
      console.error(error);
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.updateSemester = async (id, body) => {
    try {
        const semester = await models.semester.findByPk(id);

        if (!semester) {
            return { status: 404, success: false, message: 'Semester not found' };
        }

        await semester.update(body);

        return { success: true, message: 'Semester successfully updated' };

    } catch (error) {
        console.error(error);
        return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findSemestersBySubject = async (subject) => {
  try {
      const semesters = await models.semester.findAll({
          where: { subject },
          order: [['number', 'ASC']] 
      });
      return { success: true, semesters };
  } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.findOneSemester = async (id) => {
  const semester = await models.semester.findOne({
    where: { id },
  });
  if (!semester) {
    return { success: false };
  }

  return { success: true, semester };
};


exports.deleteSemester = async (id) => {
  await models.semester.destroy({ where: { id } });
  return { success: true, message: 'Semester successfully deleted' };
};