const express = require('express')
const server = express()

const playersRoute = require('./routes/players-route')
const gamesRoute = require('./routes/games-route')


server.use(express.json())

server.use('/players', playersRoute)
server.use('/games', gamesRoute)
// server.use('/projects/:id', tasksRoute)
// server.use('/projects/:id', rpRoute)

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