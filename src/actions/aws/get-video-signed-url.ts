

//! I think I won't need this.

// "use server"

// import { s3Client } from '@/lib/s3Client'
// import {GetObjectCommand} from '@aws-sdk/client-s3'
// import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

// export const getVideoSignedUrl = async (key: string)=>{

//     const command = new GetObjectCommand({
//         Bucket: process.env.AWS_BUCKET_NAME!,
//         Key:  key
//     })

//     return await getSignedUrl(s3Client, command, {
//         expiresIn: 5 // seconds
//     })
// }



