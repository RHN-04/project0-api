const models = require('../db');

exports.findProfessionalModules = async () => {
    try {
      const professionalModules = await models.professional_module.findAll();
      return { success: true, professionalModules };
    } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.createProfessionalModule = async (body) => {
    try {
      await models.professional_module.create(body);
  
      return { success: true, message: 'Professional Module successfully added' };
    } catch (error) {
      console.error(error);
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.updateProfessionalModule = async (id, body) => {
    try {
        const professionalModule = await models.professional_module.findByPk(id);

        if (!professionalModule) {
            return { status: 404, success: false, message: 'Professional Module not found' };
        }

        await professionalModule.update(body);

        return { success: true, message: 'Professional Module successfully updated' };

    } catch (error) {
        console.error(error);
        return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findOneProfessionalModule = async (id) => {
  const professionalModule = await models.professional_module.findOne({
    where: { id },
//      include: ['client', 'service'],
  });
  if (!professionalModule) {
    return { success: false };
  }

  return { success: true, professionalModule };
};


exports.deleteProfessionalModule = async (id) => {
  await models.professional_module.destroy({ where: { id } });
  return { success: true, message: 'Professional Module successfully deleted' };
};