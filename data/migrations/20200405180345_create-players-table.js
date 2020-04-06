
exports.up = async function(knex) {
  
await knex.schema.createTable("players", (table) => {
    table.increments("id")
    table.string("name").unique().notNullable()
    table.string("password").notNullable()
})

await knex.schema.createTable("games", (table) => {
    table.increments("id")
    table.date("date").notNullable()
    table.integer("holes").notNullable()
})

await knex.schema.createTable("score", (table) => {
    table.increments("id")
    table.integer("game_id").notNullable().references("id").inTable("games")
    table.string("player_name").notNullable().references("name").inTable("players")
    table.integer("net_score").notNullable()
    table.integer("gross_score").notNullable()   
})


  
    
  };
  
  exports.down = async function(knex) {
      await knex.schema.dropTableIfExists("score")
      await knex.schema.dropTableIfExists("games")
      await knex.schema.dropTableIfExists("players")
  };
  