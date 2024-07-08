const { getSeedData } = require('../src/utils/seedFetcher');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const tableName = 'diets';
  try {
    const seedData = await getSeedData(tableName);
    await knex(tableName).del().insert(seedData);
    
    console.log(`data seeded successfully: ${tableName}`);
  } catch (error) {
    console.error(error);
  }
};