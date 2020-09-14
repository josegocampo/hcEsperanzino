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

async function addGame(gameId, gameInfo) {

    if (Array.isArray(gameInfo)){
	  return db('player_games').insert(
		gameInfo.map((player) => ({
			game_id: gameId,
			player_id: player.player_id,
			holes_played: player.holes_played,
			net_score: player.net_score,
            gross_score: player.gross_score,
            hc_score : player.hc_score,
            hole1: player.hole1,
            hole2: player.hole2,
            hole3: player.hole3,
            hole4: player.hole4,
            hole5: player.hole5,
            hole6: player.hole6,
            hole7: player.hole7,
            hole8: player.hole8,
            hole9: player.hole9,
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
            gross_score: gameInfo.gross_score,
            hc_score : gameInfo.hc_score,
            hole1: gameInfo.hole1,
            hole2: gameInfo.hole2,
            hole3: gameInfo.hole3,
            hole4: gameInfo.hole4,
            hole5: gameInfo.hole5,
            hole6: gameInfo.hole6,
            hole7: gameInfo.hole7,
            hole8: gameInfo.hole8,
            hole9: gameInfo.hole9,
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