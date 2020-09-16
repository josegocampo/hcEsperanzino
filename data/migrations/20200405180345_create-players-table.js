
exports.up = async function(knex) {
  
await knex.schema.createTable("players", (table) => {
    table.increments("id")
    table.string("name").unique().notNullable()
    table.string("password").notNullable()
})

await knex.schema.createTable("games", (table) => {
    table.increments("id")
})

await knex.schema.createTable("player_games", (table) => {

    table.integer("game_id").notNullable().references("id").inTable("games").onDelete("CASCADE").onUpdate("CASCADE")
    table.integer("player_id").notNullable().references("id").inTable("players").onDelete("CASCADE").onUpdate("CASCADE")
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer("holes_played").notNullable()
    table.integer("hc_score").notNullable()
    table.integer("gross_score").notNullable()
    table.integer("net_score").notNullable()  
    table.integer("hole1").notNullable()
    table.integer("hole2").notNullable()  
    table.integer("hole3").notNullable()  
    table.integer("hole4").notNullable()  
    table.integer("hole5").notNullable()  
    table.integer("hole6").notNullable()  
    table.integer("hole7").notNullable()  
    table.integer("hole8").notNullable()  
    table.integer("hole9").notNullable()  


    table.primary([ "game_id", "player_id" ]);
})

//I think I dont need the Handicap table actually
//I can just Query the Player Games scores from the date that I want
//with the appropiate formula for calculating handicap
//will think about this. Another solution is just posting it anyways
//mixing the get handicap with the new hc score.
await knex.schema.createTable("handicap", (table) => {
    table.increments("id")
    table.integer("player_id").notNullable().references("id").inTable("players").onDelete("CASCADE").onUpdate("CASCADE")
    table.timestamp("recorded_on").notNullable()
    table.integer("handicap_number").notNullable()
})

  
  };
  
  exports.down = async function(knex) {
      await knex.schema.dropTableIfExists("handicap")
      await knex.schema.dropTableIfExists("player_games")
      await knex.schema.dropTableIfExists("games")
      await knex.schema.dropTableIfExists("players")
  };
  