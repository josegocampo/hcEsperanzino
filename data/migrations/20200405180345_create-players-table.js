
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

await knex.schema.createTable("player_games", (table) => {
    table.increments("id")
    table.integer("game_id").notNullable().references("id").inTable("games")
    table.integer("player_id").notNullable().references("id").inTable("players")
    table.integer("net_score").notNullable()
    table.integer("gross_score").notNullable()   

    table.primary([ "game_id", "player_id" ]);
})


  
    
  };
  
  exports.down = async function(knex) {
      await knex.schema.dropTableIfExists("player_games")
      await knex.schema.dropTableIfExists("games")
      await knex.schema.dropTableIfExists("players")
  };
  