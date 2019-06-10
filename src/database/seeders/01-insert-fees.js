module.exports = {
  up: queryInterface => queryInterface.bulkInsert('fees', [{
    fee_value: 0.05,
    payment_method: 'credit_card',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    fee_value: 0.03,
    payment_method: 'debit_card',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('fees', null, {}),
}
