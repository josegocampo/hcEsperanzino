const express = require('express')
const router = express.Router()

const db = require('../models/players-model')




router.get('/:id/games', async (req, res, next)=>{
    try{
        const games = await db("player_games as pg")
        .join("players as p", "p.id", "pg.player_id")
        .join("games as g", "g.id", "pg.game_id")
        .where("p.id", req.params.id)
        .select("g.*", "pg.holes_played", "pg.gross_score", "pg.net_score")

        res.json(games)
    } catch(err){
        next(err)
    }
})



module.exports = router;