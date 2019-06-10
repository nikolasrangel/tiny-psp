module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('payables', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    transaction_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'transactions',
        key: 'id',
      },
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'processing',
    },
    fee: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    payment_date: {
      type: Sequelize.DATE,
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('payables'),
}
