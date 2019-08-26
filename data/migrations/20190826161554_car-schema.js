// the changes we want to make
exports.up = function(knex) {
  // create a car table
  // define the schema
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.string('vin', 17).unique().notNullable();
    tbl.string('make', 36).notNullable();
    tbl.string('model', 36).notNullable();
    tbl.integer('mileage', 999999).notNullable();;
    tbl.string('transmission type', 36);
    tbl.string('title', 36);
  });
};

// undoes the changes
exports.down = function(knex) {
  // drop the fruits table
  return knex.schema.dropTableIfExists('cars');
};
