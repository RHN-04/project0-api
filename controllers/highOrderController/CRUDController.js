const models = require('../db');

// modelName = "curriculum"  // Model name from models folder
// extraControllers = { extraControllerName: () => {} }
// findByField = [{ fieldName: "", orderBy: "" }]
models.exports = function ({ modelName, defaultFindLimit = 6, extraControllers = {}, findByFields: [] }) {
    const controllers = {}

    controllers.find = async (page = 1, limit = defaultFindLimit) => {
        try {
            const offset = (page - 1) * limit;
            const { count, rows } = await models[modelName].findAndCountAll({ limit, offset });
            const totalPages = Math.ceil(count / limit);
            return { success: true, rows, totalPages };
        } catch (error) {
            console.error(new Error(error));
            return { success: false, status: 500, message: 'Controller exception', error };
        }
    }

    controllers.findById = async (id) => {
        try {
            const record = await models[modelName].findOne({ where: { id } });
            if (!record) {
                return { success: false, status: 404, message: `'${modelName}' not found` };
            }
            return { success: true, record };
        } catch (error) {
            console.error(new Error(error));
            return { status: 500, success: false, message: 'Controller exception', error };
        }
    }

    controllers.create = async (body) => {
        try {
            await models[modelName].create(body);
            return { success: true, message: `'${modelName}' successfully added` };
        } catch (error) {
            console.error(error);
            return { success: false, status: 500, message: 'Controller exception', error };
        }
    }

    controllers.update = async (id, body) => {
        try {
            const record = await models[modelName].findByPk(id);
            if (!record) {
                return { success: false, status: 404, message: `'${modelName}' not found` };
            }
            await record.update(body);
            return { success: true, message: `'${modelName}' successfully updated` };
        } catch (error) {
            console.error(error);
            return { success: false, status: 500, message: 'Controller exception', error };
        }
    }

    controllers.delete = async (id) => {
        try {
            await models[modelName].destroy({ where: { id } });
            return { success: true, message: `'${modelName}' successfully deleted` };
        } catch (error) {
            console.error(new Error(error));
            return { success: false, status: 500, message: 'Controller exception', error };
        }
    }

    controllers.findByField = {}
    findByFields.forEach(({ fieldName, orderBy }) => {
        controllers.findByField[fieldName] = async (fieldValue, page = 1, limit = defaultFindLimit) => {
            try {
                const offset = (page - 1) * limit;
                const { count, rows } = await models[modelName].findAndCountAll({
                    where: { [fieldName]: fieldValue },
                    order: orderBy,
                    limit,
                    offset
                });
                const totalPages = Math.ceil(count / limit);
                return { success: true, rows, totalPages };
            } catch (error) {
                console.error(new Error(error));
                return { status: 500, success: false, message: 'Controller exception', error };
            }
        };
    })

    return { ...controllers, ...extraControllers }
}