const { sequelize, User, Cafe } = require('../models');

const dropCafeTable = async () => {
  await Cafe.drop().then(() => {
    console.log(`Cafe table delete.`);
  });
};

const dropUserTable = async () => {
  await User.drop().then(() => {
    console.log(`User table delete.`);
  });
};

const resetTables = async () => {
  await dropCafeTable();
  await dropUserTable();
  await sequelize.sync();
  await sequelize.close();
};

resetTables();
