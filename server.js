const express = require('express')
const server = express()

const playersRoute = require('./routes/players-route')
const gamesRoute = require('./routes/games-route')
const handicapRoute = require('./routes/handicap-route')
const playerGamesRoute = require('./routes/player-games-route')


server.use(express.json())

server.use('/players', playersRoute)
server.use('/games', gamesRoute)
server.use('/players/:id', handicapRoute)
server.use('/players', playerGamesRoute)

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



const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})