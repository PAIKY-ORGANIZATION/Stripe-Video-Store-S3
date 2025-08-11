import {S3Client} from '@aws-sdk/client-s3'




export const s3Client = new S3Client({
    region: process.env.OBJECT_STORAGE_BUCKET_REGION!,

    //! This endpoint can be UNDEFINED if you're using AWS S31
    endpoint: process.env.OBJECT_STORAGE_ENDPOINT, //*  Example: endpoint for Hetzner. 
    credentials: {
        accessKeyId: process.env.OBJECT_STORAGE_ACCESS_KEY!,
        secretAccessKey: process.env.OBJECT_STORAGE_SECRET_KEY!
    }
})