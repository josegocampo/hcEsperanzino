
const express = require('express')
var cors = require('cors')
const server = express()
const port = process.env.PORT || 4000

const players = require('./routes/players-route')
const games = require('./routes/games-route')
const handicap = require('./routes/handicap-route')
const playerGames = require('./routes/player-games-route')


server.use(cors())
server.use(express.json())


server.use('/players', players)
server.use('/games', games)
server.use('/players/:id', handicap)
server.use('/players', playerGames)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
        message: "Something went wrong",
	})
})


server.get('/', (req, res)=>{
    res.json({
        message: 'Welcome!'
    })
})


server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})