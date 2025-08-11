import { s3Client } from "@/lib/s3Client"
import { GetObjectCommand } from "@aws-sdk/client-s3"

export const getVideoStream = async (key: string): Promise<ReadableStream>=>{

    const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.OBJECT_STORAGE_BUCKET_NAME!,
        Key: key
    })
    
    const {Body} = await s3Client.send(getObjectCommand) 

    return Body as ReadableStream
}