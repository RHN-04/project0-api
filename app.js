const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const cors = require('cors');

const specialty = require('./routes/specialty');
const curriculum = require('./routes/curriculum');
const cycle = require('./routes/cycle');
const professionalModule = require('./routes/professional_module');
const subject = require('./routes/subject');
const educationLevel = require('./routes/education_level');
const lesson = require('./routes/lesson');
const source = require('./routes/source');
const semester = require('./routes/semester');
const theme = require('./routes/theme');
const unit = require('./routes/unit');

const app = express();

app.use(bodyParser.json());
app.use(cors());

//app.use((req, res, next) => {
//    req.hello1 = "DATA"
//    next();
//    if (!res.headersSent) {
//        res.status(500).send("Я ошиблась в коде");
//   }
//})

app.use("/specialty", specialty)
app.use("/curriculum", curriculum)
app.use("/cycle", cycle)
app.use("/professional_module", professionalModule)
app.use("/subject", subject)
app.use("/education_level", educationLevel)
app.use("/lesson", lesson)
app.use("/source", source)
app.use("/semester", semester)
app.use("/theme", theme)
app.use("/unit", unit)

const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on port ${PORT}`));