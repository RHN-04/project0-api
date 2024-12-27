const models = require('../db');

exports.findThemes = async () => {
    try {
      const themes = await models.theme.findAll();
      return { success: true, themes };
    } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findThemesByUnit = async (unit) => {
  try {
    const themes = await models.theme.findAll({
      where: { unit },
      order: [['number', 'ASC']], 
    });
    return { success: true, themes };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.createTheme = async (body) => {
    try {
      await models.theme.create(body);
      return { success: true, message: 'Theme successfully added' };
    } catch (error) {
      console.error(error);
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.updateTheme = async (id, body) => {
    try {
        const theme = await models.theme.findByPk(id);

        if (!theme) {
            return { status: 404, success: false, message: 'Theme not found' };
        }

        await theme.update(body);

        return { success: true, message: 'Theme successfully updated' };

    } catch (error) {
        console.error(error);
        return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findOneTheme = async (id) => {
  const theme = await models.theme.findOne({
    where: { id },
  });
  if (!theme) {
    return { success: false };
  }

  return { success: true, theme };
};


exports.deleteTheme = async (id) => {
  await models.theme.destroy({ where: { id } });
  return { success: true, message: 'Theme successfully deleted' };
};