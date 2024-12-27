const models = require('../db');

exports.findSources = async () => {
    try {
      const sources = await models.source.findAll();
      return { success: true, sources };
    } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.createSource = async (body) => {
    try {
      await models.source.create(body);
      return { success: true, message: 'Source successfully added' };
    } catch (error) {
      console.error(error);
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.updateSource = async (id, body) => {
    try {
        const source = await models.source.findByPk(id);

        if (!source) {
            return { status: 404, success: false, message: 'Source not found' };
        }

        await source.update(body);

        return { success: true, message: 'Source successfully updated' };

    } catch (error) {
        console.error(error);
        return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findOneSource = async (id) => {
  const source = await models.source.findOne({
    where: { id },
  });
  if (!source) {
    return { success: false };
  }

  return { success: true, source };
};


exports.deleteSource = async (id) => {
  await models.source.destroy({ where: { id } });
  return { success: true, message: 'Source successfully deleted' };
};