const models = require('../db');

exports.findEducationLevels = async () => {
    try {
      const educationLevels = await models.education_level.findAll();
      return { success: true, educationLevels };
    } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findOneEducationLevel = async (id) => {
    const educationLevel = await models.education_level.findOne({
      where: { id },
    });
    if (!educationLevel) {
      return { success: false };
    }
  
    return { success: true, educationLevel };
  };
  
