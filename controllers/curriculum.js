const models = require('../db');

exports.findCurriculums = async (page = 1, limit = 6) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows: curriculums } = await models.curriculum.findAndCountAll({ limit, offset });
    const totalPages = Math.ceil(count / limit);
    return { success: true, curriculums, totalPages };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.createCurriculum = async (body) => {
    try {
      await models.curriculum.create(body);
  
      return { success: true, message: 'Curriculum successfully added' };
    } catch (error) {
      console.error(error);
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.updateCurriculum = async (id, body) => {
    try {
        const curriculum = await models.curriculum.findByPk(id);

        if (!curriculum) {
            return { status: 404, success: false, message: 'Curriculum not found' };
        }

        await curriculum.update(body);

        return { success: true, message: 'Curriculum successfully updated' };

    } catch (error) {
        console.error(error);
        return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findOneCurriculum = async (id) => {
    try {
      const curriculum = await models.curriculum.findOne({
        where: { id },
      });
      if (!curriculum) {
        return { success: false, message: 'Curriculum not found' };
      }
    
      return { success: true, curriculum };
    } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findCurriculumsBySpecialty = async (specialtyId, page = 1, limit = 6) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows: curriculums } = await models.curriculum.findAndCountAll({
      where: { specialty: specialtyId },
      order: [['year', 'ASC']],
      limit,
      offset
    });
    const totalPages = Math.ceil(count / limit);
    return { success: true, curriculums, totalPages };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.deleteCurriculum = async (id) => {
  try {
    await models.curriculum.destroy({ where: { id } });
    return { success: true, message: 'Curriculum successfully deleted' };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};