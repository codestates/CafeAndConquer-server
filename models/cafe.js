module.exports = (sequelize, DataTypes) => {
  const Cafe = sequelize.define(
    'cafe',
    {
      cafeId: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      cafeName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      point: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      open24Hour: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      priceIceAmericano: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      enoughOutlets: {
        type: DataTypes.ENUM('LACK', 'NORMAL', 'MANY'),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  Cafe.associate = (db) => {
    db.Cafe.belongsTo(db.User, {
      foreignKey: { name: 'pioneer', allowNull: false },
      targetKey: 'id',
    });
  };

  return Cafe;
};
