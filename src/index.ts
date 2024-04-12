import express, { Request, Response } from 'express'
import cors from 'cors'
import { prisma as Client } from './config/Client'
import V1Routes from './routes/v1/app'
import multer from 'multer'

const app = express()

const port: number = parseInt(process.env.PORT || '5000', 10)

const upload = multer().any()

app.use(upload)
app.use(express.json())
app.use(cors())

Client.$connect()
  .then(() => {
    console.log('connected database successfully')
  })
  .catch((err) => {
    console.log(err.message)
  })

app.use('/api/v1/', V1Routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the chatting server')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
