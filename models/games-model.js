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
    return await db('games')
    .insert({
        date: data.date,
    })
}


function addGame(gameId, gameInfo){

     gameInfo.forEach((player) =>{
      return db('player_games')
      .insert({
          game_id: gameId,
          player_id: player.playerId,
          holes_played: player.holesPlayed,
          net_score: player.netScore,
          gross_score: player.grossScore
      })      
    })
  
    // return await db('player_games')  
    // .insert({
    //     game_id: gameInfo.gameId,
    //     player_id: gameInfo.forEach((playerInfo)=>{
    //         playerInfo.playerId
    //     }),
    //     holes_played: gameInfo.forEach((playerInfo)=>{
    //         playerInfo.holesPlayed
    //     }),
    //     net_score: gameInfo.forEach((playerInfo)=>{
    //         playerInfo.netScore
    //     }),
    //     gross_score: gameInfo.forEach((playerInfo)=>{
    //         playerInfo.grossScore
    //     }),
        
      
    //     })
       
   
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