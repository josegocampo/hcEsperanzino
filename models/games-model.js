const db = require('../data/config')


async function getAll(){
    return await db.table('games')
}

async function getById(id){
    const games = await db.table('games')
    .where('games.id', id)
    return games
}

async function insert(data){
    return db('games')
    .insert({

    })
}

function addGame(gameId, gameInfo) {

    if (Array.isArray(gameInfo)){
	  return db('player_games').insert(
		gameInfo.map((player) => ({
			game_id: gameId,
			player_id: player.player_id,
			holes_played: player.holes_played,
			net_score: player.net_score,
			gross_score: player.gross_score
		})
	))
}
    else {
      return db('player_games').insert(
          {
            game_id: gameId,
            player_id: gameInfo.player_id,
            holes_played: gameInfo.holes_played,
            net_score: gameInfo.net_score,
            gross_score: gameInfo.gross_score
      })    
    }
}
 
  
async function getGameInfo(id){
    const games = await db.table('player_games as pg')
    .where('pg.game_id', id)
    return games
}


module.exports = {
    getAll,
    getById,
    insert,
    addGame,
    getGameInfo
};