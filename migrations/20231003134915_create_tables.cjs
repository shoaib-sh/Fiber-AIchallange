exports.up = function (knex) {
  return knex.schema
    .createTable("customers", (table) => {
      table.increments("id").primary();
      table.integer("Index");
      table.integer("Customer Id");
      table.string("First Name");
      table.string("Last Name");
      table.string("Company");
      table.string("City");
      table.string("Country");
      table.string("Phone 1");
      table.string("Phone 2");
      table.string("Email");
      table.date("Subscription Date");
      table.string("Website");
    })
    .createTable("organizations", (table) => {
      table.increments("id").primary();
      table.integer("Index");
      table.integer("Organization Id");
      table.string("Name");
      table.string("Website");
      table.string("Country");
      table.text("Description");
      table.date("Founded");
      table.string("Industry");
      table.integer("Number of employees");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("customers")
    .dropTableIfExists("organizations");
};
