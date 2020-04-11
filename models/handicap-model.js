const express = require('express')
const router = express.Router()

const db = require('../data/config')


async function getAll(){
    return await db.table('handicap')
}

async function getById(id){
    const players = await db.table('players')
    .where('players.id', id)
    return players
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