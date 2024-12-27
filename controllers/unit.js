const models = require('../db');

exports.findUnits = async () => {
    try {
      const units = await models.unit.findAll();
      return { success: true, units };
    } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findUnitsBySubject = async (subject) => {
  try {
      const units = await models.unit.findAll({ 
          where: { subject },
          order: [['number', 'ASC']] 
      });
      return { success: true, units };
  } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.createUnit = async (body) => {
    try {
      await models.unit.create(body);
      return { success: true, message: 'Unit successfully added' };
    } catch (error) {
      console.error(error);
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.updateUnit = async (id, body) => {
    try {
        const unit = await models.unit.findByPk(id);

        if (!unit) {
            return { status: 404, success: false, message: 'Unit not found' };
        }

        await unit.update(body);

        return { success: true, message: 'Unit successfully updated' };

    } catch (error) {
        console.error(error);
        return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findOneUnit = async (id) => {
  const unit = await models.unit.findOne({
    where: { id },
  });
  if (!unit) {
    return { success: false };
  }

  return { success: true, unit };
};


exports.deleteUnit = async (id) => {
  await models.unit.destroy({ where: { id } });
  return { success: true, message: 'Unit successfully deleted' };
};