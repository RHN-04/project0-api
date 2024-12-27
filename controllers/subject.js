const models = require('../db');
const sequelize = models.subject.sequelize;

exports.findSubjects = async () => {
  try {
    const subjects = await models.subject.findAll();
    return { success: true, subjects };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.createSubjectWithSemesters = async (body, semesters) => {
  const transaction = await sequelize.transaction();  
  try {
    const newSubject = await models.subject.create(body, { transaction });

    if (semesters && semesters.length > 0) {
      for (const sem of semesters) {
        sem.subject = newSubject.id;
        await models.semester.create(sem, { transaction });
      }
    }

    await transaction.commit();
    return { success: true, message: 'Subject and semesters successfully added', subjectId: newSubject.id };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.updateSubjectWithSemesters = async (id, body, semesters) => {
  const transaction = await sequelize.transaction();  
  try {
    const existingSubject = await models.subject.findByPk(id, { transaction });

    if (!existingSubject) {
      await transaction.rollback();
      return { status: 404, success: false, message: 'Subject not found' };
    }

    await existingSubject.update(body, { transaction });

    if (semesters && semesters.length > 0) {
      for (const sem of semesters) {
        if (sem.isDeleted && sem.id) {
          await models.semester.destroy({ where: { id: sem.id }, transaction });
        } else if (sem.id) {
          const existingSemester = await models.semester.findByPk(sem.id, { transaction });
          if (existingSemester) {
            await existingSemester.update(sem, { transaction });
          }
        } else {
          sem.subject = id; 
          await models.semester.create(sem, { transaction });
        }
      }
    }

    await transaction.commit();
    return { success: true, message: 'Subject and semesters successfully updated' };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};


exports.getSubjectsByCurriculum = async (curriculumId) => {
  try {
    const subjects = await models.subject.findAll({
      where: { curriculum: curriculumId },
      attributes: {
        include: [
          [
            sequelize.fn('SUM', sequelize.col('semesters.lab_hours')),
            'totalLabHours'
          ],
          [
            sequelize.fn('SUM', sequelize.col('semesters.practice_hours')),
            'totalPracticeHours'
          ],
          [
            sequelize.fn('SUM', sequelize.col('semesters.lection_hours')),
            'totalLectionHours'
          ],
          [
            sequelize.fn('SUM', sequelize.col('semesters.independent_work_hours')),
            'totalIndependentWorkHours'
          ],
          [
            sequelize.fn('SUM', sequelize.col('semesters.individual_project_hours')),
            'totalIndividualProjectHours'
          ],
          [
            sequelize.fn('SUM', sequelize.col('semesters.course_project_hours')),
            'totalCourseProjectHours'
          ],
          [
            sequelize.fn('SUM', sequelize.col('semesters.access_hours')),
            'totalAccessHours'
          ],
          [
            sequelize.fn('STRING_AGG', sequelize.cast(sequelize.col('semesters.number'), 'text'), ','),
            'semesterNumbers'
          ],
          [
            sequelize.fn('ARRAY_AGG', sequelize.col('semesters.form_of_accessment')),
            'formOfAccessments'
          ]
        ]
      },
      include: [
        {
          model: models.semester, 
          as: 'semesters', 
          attributes: []
        }
      ],
      group: ['subject.id'] 
    });
    const subjectsWithAccessments = subjects.map(subject => subject.get({ plain: true }));

    return { success: true, subjects: subjectsWithAccessments };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.createSubject = async (body) => {
  try {
    await models.subject.create(body);
  
    return { success: true, message: 'Subject successfully added' };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.updateSubject = async (id, body) => {
  try {
    const subject = await models.subject.findByPk(id);

    if (!subject) {
      return { status: 404, success: false, message: 'Subject not found' };
    }

    await subject.update(body);

    return { success: true, message: 'Subject successfully updated' };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.findOneSubject = async (id) => {
  try {
    const subject = await models.subject.findOne({
      where: { id },
    });

    if (!subject) {
      return { success: false, message: 'Subject not found' };
    }

    return { success: true, subject };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.deleteSubject = async (id) => {
  try {
    await models.subject.destroy({ where: { id } });
    return { success: true, message: 'Subject successfully deleted' };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};
