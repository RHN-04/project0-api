const models = require('../db');

exports.findLessons = async () => {
    try {
      const lessons = await models.lesson.findAll();
      return { success: true, lessons };
    } catch (error) {
      console.error(new Error(error));
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findLessonsByTheme = async (themeId) => {
  try {
    const lessons = await models.lesson.findAll({ where: { theme: themeId } });
    const lectionLessons = lessons.filter(lesson => lesson.type_of_lesson === 'ЛК');
    const practiceLessons = lessons.filter(lesson => lesson.type_of_lesson === 'ПР');
    const labLessons = lessons.filter(lesson => lesson.type_of_lesson === 'ЛР');
    const practiceLabLessons = [...practiceLessons, ...labLessons];

    return {
      success: true,
      lessons: {
        lectionLessons,
        practiceLabLessons,
      },
    };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.createLesson = async (body) => {
    try {
      await models.lesson.create(body);
      return { success: true, message: 'Lesson successfully added' };
    } catch (error) {
      console.error(error);
      return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.updateLesson = async (id, body) => {
    try {
        const lesson = await models.lesson.findByPk(id);

        if (!lesson) {
            return { status: 404, success: false, message: 'Lesson not found' };
        }

        await lesson.update(body);

        return { success: true, message: 'Lesson successfully updated' };

    } catch (error) {
        console.error(error);
        return { status: 500, success: false, message: 'Controller exception', error };
    }
};

exports.findOneLesson = async (id) => {
  const lesson = await models.lesson.findOne({
    where: { id },
  });
  if (!lesson) {
    return { success: false };
  }

  return { success: true, lesson };
};


exports.deleteLesson = async (id) => {
  await models.lesson.destroy({ where: { id } });
  return { success: true, message: 'Lesson successfully deleted' };
};