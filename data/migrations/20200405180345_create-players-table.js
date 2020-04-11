
exports.up = async function(knex) {
  
await knex.schema.createTable("players", (table) => {
    table.increments("id")
    table.string("name").unique().notNullable()
    table.string("password").notNullable()
})

await knex.schema.createTable("games", (table) => {
    table.increments("id")
    table.date("date").notNullable()
})

await knex.schema.createTable("player_games", (table) => {

    table.integer("game_id").notNullable().references("id").inTable("games").onDelete("CASCADE").onUpdate("CASCADE")
    table.integer("player_id").notNullable().references("id").inTable("players").onDelete("CASCADE").onUpdate("CASCADE")
    table.date("game_date").notNullable().references("date").inTable("games").onDelete("CASCADE").onUpdate("CASCADE")
    table.integer("holes_played").notNullable()
    table.integer("net_score").notNullable()
    table.integer("gross_score").notNullable()   

    table.primary([ "game_id", "player_id" ]);
})


await knex.schema.createTable("handicap_history", (table) => {
    table.increments("id")
    table.integer("player_id").notNullable().references("id").inTable("players").onDelete("CASCADE").onUpdate("CASCADE")
    table.timestamp("recorded_on").notNullable()
    table.integer("handicap").notNullable()
})

  
  };
  
  exports.down = async function(knex) {
      await knex.schema.dropTableIfExists("handicap_history")
      await knex.schema.dropTableIfExists("player_games")
      await knex.schema.dropTableIfExists("games")
      await knex.schema.dropTableIfExists("players")
  };
  