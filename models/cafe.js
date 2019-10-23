module.exports = (sequelize, DataTypes) => {
  const Cafe = sequelize.define(
    'cafe',
    {
      cafeName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      point: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
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
