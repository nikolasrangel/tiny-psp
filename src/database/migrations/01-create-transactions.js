module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    api_key: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    amount: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    card_holder_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    card_expiration_date: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    card_last_digits: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    card_cvv: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    card_brand: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    payment_method: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('transactions'),
}
