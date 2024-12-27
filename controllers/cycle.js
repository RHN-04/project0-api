const models = require('../db');

exports.findCycles = async () => {
    try {
      const cycles = await models.cycle.findAll();
      return { success: true, cycles };
    } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.createCycle = async (body) => {
    try {
      await models.cycle.create(body);

      return { success: true, message: 'Cycle successfully added' };
    } catch (error) {
      console.error(error);
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.updateCycle = async (id, body) => {
    try {
        const cycle = await models.cycle.findByPk(id);

        if (!cycle) {
            return { status: 404, success: false, message: 'Cycle not found' };
        }

        await cycle.update(body);

        return { success: true, message: 'Cycle successfully updated' };

    } catch (error) {
        console.error(error);
        return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findOneCycle = async (id) => {
  const cycle = await models.cycle.findOne({
    where: { id },
//      include: ['client', 'service'],
  });
  if (!cycle) {
    return { success: false };
  }

  return { success: true, cycle };
};


exports.deleteCycle = async (id) => {
  await models.cycle.destroy({ where: { id } });
  return { success: true, message: 'Cycle successfully deleted' };
};