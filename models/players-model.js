const db = require('../data/config')


async function getAll(){
    return await db.table('players')
}

async function getById(id){
    const players = await db.table('players')
    .where('players.id', id)
    return players
}

async function insert(data){
    return await db('players')
    .insert({
        name: data.name,
        password: data.password,
    })
}



module.exports = {
    getAll,
    getById,
    insert,
};