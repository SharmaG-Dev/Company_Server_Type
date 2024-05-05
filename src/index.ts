import express, { Request, Response } from 'express'
import { createServer } from 'node:http';
import cors from 'cors'
import { prisma as Client } from './config/Client'
import V1Routes from './routes/v1/app'
import multer from 'multer'
import { Server } from 'socket.io';

import { handleSocket } from './helpers/v1/services/socket';

const app = express()

const port: number = parseInt(process.env.PORT || '5000', 10)
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: true
  }
});
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

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the chatting server')
})

io.on('connection', handleSocket);

app.use('/api/v1/', V1Routes)



server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
