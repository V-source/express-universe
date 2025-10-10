import 'dotenv/config'
import express from 'express'
import dbConnection from './db/index.js'


const server = express()
const PORT = process.env.PORT || 4000



server.use(express.json())
server.use(express.urlencoded({extended: false}))


dbConnection()

server.get('/', (req, res) => {
  res.status(200).json({msg: 'express server'})
})



server.use(async (err, req, res, nex) => {
  try {
    if(err.name === 'ReferenceError') {
      console.log('error de referencia')
    }
    // res.status(500).json({msg: err.message})
  } catch (error) {
    
  }
}) 


server.listen(PORT, () => {
  console.log(`server on port: ${PORT}`)
})


