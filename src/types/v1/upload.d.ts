export interface UploadData {
    id: string
}

export interface Credentials extends UploadData {
    files: Express.Multer.File[]
}