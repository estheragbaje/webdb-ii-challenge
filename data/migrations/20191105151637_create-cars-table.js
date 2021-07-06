exports.up = function(knex) {
  return knex.schema.createTable("cars", table => {
    table.increments("id");
    table
      .text("VIN")
      .unique()
      .notNullable();
    table.text("make").notNullable;
    table.text("model").notNullable;
    table.decimal("mileage").notNullable;
    table.text("transmission");
    table.text("title");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
