'use strict';
const bcrypt = require('bcrypt');
const getSampleData = require('../utils/dataProvider');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const files = [
      'sampleData00.json',
      'sampleData01.json',
      'sampleData02.json',
      'sampleData03.json',
      'sampleData04.json',
      'sampleData05.json',
      'sampleData06.json',
      'sampleData07.json',
      'sampleData08.json',
      'sampleData09.json',
    ];
    let rawData = [];
    for (const file of files) {
      rawData = rawData.concat(getSampleData(file));
    }
    // console.log(rawData);
    const cafes = rawData.map((r) => {
      const c = { ...r };
      c.point = Sequelize.fn('ST_GeomFromText', `POINT(${r.x} ${r.y})`);
      delete c.x;
      delete c.y;
      return c;
    });
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'aaa@gmail.com',
          nick: 'aaa',
          password: await bcrypt.hash('aaa', 10),
          provider: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert('cafe', cafes, {});
    return;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cafe', null, {});
  },
};
