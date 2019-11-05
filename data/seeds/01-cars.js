exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          VIN: "2CGBH41JXMN109467",
          make: "Honda",
          model: "1990",
          mileage: 20.7
        }
      ]);
    });
};
