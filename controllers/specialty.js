const models = require('../db');
const { Op } = require('sequelize');

exports.findSpecialties = async (page = 1, limit = 6) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows: specialties } = await models.specialty.findAndCountAll({
      limit,
      offset,
      order: [['code', 'ASC']],
    });
    const totalPages = Math.ceil(count / limit);
    return { success: true, specialties, totalPages };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.createSpecialty = async (body) => {
  try {
    await models.specialty.create(body);
    return { success: true, message: 'Specialty successfully added' };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.updateSpecialty = async (id, body) => {
  try {
    const specialty = await models.specialty.findByPk(id);

    if (!specialty) {
      return { status: 404, success: false, message: 'Specialty not found' };
    }

    await specialty.update(body);

    return { success: true, message: 'Specialty successfully updated' };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.findOneSpecialty = async (id) => {
  try {
    const specialty = await models.specialty.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!specialty) {
      return { success: false, message: 'Specialty not found' };
    }

    return { success: true, specialty };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.deleteSpecialty = async (id) => {
  try {
    await models.specialty.destroy({ where: { id: parseInt(id, 10) } });
    return { success: true, message: 'Specialty successfully deleted' };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.searchSpecialties = async (query) => {
  try {
    let specialties;
    if (!query) {
      specialties = await models.specialty.findAll({
        order: [['code', 'ASC']],
        limit: 6,
      });
    } else {
      specialties = await models.specialty.findAll({
        where: {
          [Op.or]: [
            { code: { [Op.iLike]: `%${query}%` } },
            { name: { [Op.iLike]: `%{query}%` } },
          ],
        },
        order: [['code', 'ASC']],
        limit: 3,
      });
    }
    return { success: true, specialties };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};
