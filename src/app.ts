import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import Client from 'config/Client'
import RoutesV1 from 'routes/v1/index'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

// database connection check
Client.$connect()
  .then(() => console.log('Database connected successfully!'))
  .catch((err: Error) => console.log('Database connection error: ', err))

app.use('/api/v1', RoutesV1);

app.get('/', (req, res) => {
  res.send('your are good to go')
})

const port = Number(process.env.PORT) || 8000

app.listen(port, '0.0.0.0', () => {
  console.log(`API is running on port: ${port}`)
})
