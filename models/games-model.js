const express = require('express')
const router = express.Router()

const db = require('../data/config')


async function getAll(){
    return await db.table('games')
}

async function getById(id){
    const games = await db.table('player_games')
    .where('games.id', id)
    return games
}

async function insert(data){
    return await db('games')
    .insert({
        date: data.date,
    })
}



module.exports = {
    getAll,
    getById,
    insert,
};