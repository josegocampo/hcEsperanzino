const db = require('../data/config')


async function getAll(){
    return await db.table('handicap')
}

async function getById(id){
    const playerHandicap = await db.table('handicap as h')
    .where('h.player_id', id)
    .select('h.handicap_number as Handicap')
    return playerHandicap
}

async function insert(data){
    return await db('handicap')
    .insert({
        id: data.id,
        handicap: data.handicap,
    })
}



module.exports = {
    getAll,
    getById,
    insert,
};