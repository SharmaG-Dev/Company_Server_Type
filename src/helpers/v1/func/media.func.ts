import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { Credentials } from '../../../types/v1/upload';
import { S3Instance } from '../../../config/UploadFiles';
import { genUniqueNames } from '../utils/files';
import dotenv from 'dotenv'
dotenv.config()


export async function uploadFile(credentials: Credentials): Promise<string[]> {
    const { id, files } = credentials

    const result: string[] = []

    for (let i = 0; i < files.length; i++) {
        const key = id
        const file = files[i]
        const _fileName = genUniqueNames(10)

        const params: PutObjectRequest = {
            Bucket: `${process.env.S3_BUCKET}`,
            Key: `${key}/${_fileName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentDisposition: `inline; filename-'${file.originalname}'`
        }

        await uploadSingle(params)
            .then((res) => result.push(res))
            .catch((err) => {
                throw err
            })

    }


    return result
}




export async function uploadSingle(parms: PutObjectRequest): Promise<string> {
    return new Promise((res, rej) => {
        S3Instance.upload(parms, (err, data) => {
            if (err) {
                rej(err)
            } else {
                res(data.Key)
            }
        })
    })
}