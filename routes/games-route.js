const express = require('express')
const router = express.Router()

const db = require('../models/games-model')

router.get("/", async (req, res, next) =>{
    try{
        res.json(await db.getAll())
    }
    catch(err){
        next(err)
    }
})

router.get('/:id', async (req, res, next)=>{
    try{
        res.json(await db.getById(req.params.id))
    } catch(err){
        next(err)
    }
})

router.post("/", async (req, res, next) =>{
    try{
        res.json(await db.insert(req.body))
    }
    catch(err){
        next(err)
    }
})

router.post("/:id/gameinfo", async (req, res, next) =>{
    try{
        res.json(await db.addGame(req.params.id, req.body))
    }
    catch(err){
        next(err)
    }
})

router.get("/:id/gameinfo", async (req, res, next) =>{
    try{
        res.json(await db.getGameInfo(req.params.id))
    }
    catch(err){
        next(err)
    }
})


module.exports = router;