'use strict';

  /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('curriculum', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      specialty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'specialty',
          key: 'id'
        }
      },
      groups: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });

    await queryInterface.createTable('cycle', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });

    await queryInterface.createTable('education_level', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });

    await queryInterface.createTable('lesson', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      type_of_lesson: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      number_of_hours: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      theme: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'theme',
          key: 'id'
        }
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    await queryInterface.createTable('professional_module', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      code: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });

    await queryInterface.createTable('semester', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lab_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      practice_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      lection_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      independent_work_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      individual_project_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      course_project_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      form_of_accessment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      access_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      subject: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subject',
          key: 'id'
        }
      }
    });

    await queryInterface.createTable('source', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      year_of_publishing: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      source_type: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      is_main: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      subject: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subject',
          key: 'id'
        }
      },
      number_of_copy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    });

    await queryInterface.createTable('specialty', {
      code: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      qualification: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      education_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'education_level',
          key: 'id'
        }
      },
      profile: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });

    await queryInterface.createTable('subject', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      curriculum: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'curriculum',
          key: 'id'
        }
      },
      code: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cycle: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cycle',
          key: 'id'
        }
      },
      professional_module: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'professional_module',
          key: 'id'
        }
      },
      author: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });

    await queryInterface.createTable('theme', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      unit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'unit',
          key: 'id'
        }
      },
      lection_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      lab_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      practice_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      independent_work_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    });

    await queryInterface.createTable('unit', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      number: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      subject: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subject',
          key: 'id'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('curriculum');
    await queryInterface.dropTable('cycle');
    await queryInterface.dropTable('education_level');
    await queryInterface.dropTable('lesson');
    await queryInterface.dropTable('professional_module');
    await queryInterface.dropTable('semester');
    await queryInterface.dropTable('source');
    await queryInterface.dropTable('specialty');
    await queryInterface.dropTable('subject');
    await queryInterface.dropTable('theme');
    await queryInterface.dropTable('unit');
  }
};
