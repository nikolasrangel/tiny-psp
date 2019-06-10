module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('fees', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    fee_value: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    payment_method: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('fees'),
}
