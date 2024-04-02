import express, { Request, Response } from 'express'
import cors from 'cors'
import { Client } from './config/Client'

const app = express()

const port: number = parseInt(process.env.PORT || '5000', 10)

app.use(express.json())
app.use(cors())

Client.$connect()
  .then(() => {
    console.log('connected database successfully')
  })
  .catch((err) => {
    console.log(err.message)
  })

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the chatting server')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
