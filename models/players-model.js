const db = require('../data/config')


async function getAll(){
    return await db.table('players')
}

async function getById(id){

    const getScoreNine = await db.table('player_games as pg')
     .orderBy('pg.net_score', 'desc').limit(20)
     .where('pg.player_id', id)
     .where('pg.holes_played', 9)
     

     const handicapArray = getScoreNine.map((netScore) => netScore.net_score)
 

     let totalScore = 0

     const addScore = handicapArray.map((score) => {
        totalScore += score
        return totalScore
    })
    
    let handicap = Math.round(totalScore/ handicapArray.length * 0.96)

    console.log(handicap)
   
     

    const players = await db.table('player_games as pg')
    .join('players as p', 'p.id', 'pg.player_id')
    .orderBy('pg.created_at', 'desc').limit(2)
    .where('p.id', id) //
    .select('p.*')
    

    return players
}

async function insert(data){
    return await db('players')
    .insert({
        name: data.name,
        password: data.password,
    })
}

async function getPlayerGames(id){
   const pg = await db('players as p')
    .join('player_games as pg', 'pg.player_id', 'p.id')
    .select('p.name as Player Name', 'pg.holes_played as Holes Played','pg.gross_score as Gross Score', 'pg.net_score as Net Score')
    .where('p.id', id)

    return pg
}



module.exports = {
    getAll,
    getById,
    insert,
    getPlayerGames
};