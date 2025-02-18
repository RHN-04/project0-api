const CRUDController = require("./highOrderController/CRUDController");

exports.curriculum = CRUDController({
    modelName: "curriculum",
    findByFields: [{ fieldName: "specialty", orderBy: [['year', 'ASC']] }]
})

exports.cycle = CRUDController({ modelName: "cycle" })

exports.education_level = CRUDController({
    modelName: "education_level", extraCotrollers: {
        create: async () => null,
        update: async () => null,
        delete: async () => null,
    }
})