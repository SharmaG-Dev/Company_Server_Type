import dotenv from 'dotenv'
import AWS from 'aws-sdk'

dotenv.config()

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION
})

const spaceEndpoint = new AWS.Endpoint(`${process.env.S3_ENDPOINT}`)
export const S3Instance = new AWS.S3({ endpoint: spaceEndpoint })