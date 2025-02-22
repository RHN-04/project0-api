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

exports.lesson = CRUDController({ modelName: "lesson" }) // здесь в findByFields по теме происходит деление на лабы, лекции и практики, не знаю, как перенести аккуратно

exports.professional_module = CRUDController({ modelName: "professional_module" })

exports.semester = CRUDController({ 
    modelName: "semester",
    findByFields: [{ fieldName: "subject", orderBy: [['number', 'ASC']] }]
 })

exports.source = CRUDController({ modelName: "source" })

exports.specialty = CRUDController({ modelName: "specialty" }) // здесь реализован поиск

exports.subject = CRUDController({ modelName: "subject" }) // здесь происходит веселье с транзакциями, потому что вся информация, связанная с часами, хранится в семестре, связанным с предметом, а не в самом предмете

exports.theme = CRUDController({ 
    modelName: "theme",
    findByFields: [{ fieldName: "unit", orderBy: [['number', 'ASC']] }]
})

exports.unit = CRUDController({ modelName: "unit" })