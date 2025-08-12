import {headers} from 'next/headers'   
import {logRequest} from 'req-logger-express'




type Params = {
    filePath: string,
    action: string,
    additionalLogInfo?: string
}


export const logAction = async ({filePath, action, additionalLogInfo}: Params)=>{

    const headersStore = await headers() 

    const ip = headersStore.get('ip') || '' //$ The IP is set by middleware
    
    //* If we are in development, avoid writing to the file system because it triggers a lot of hot reloads.
    if(process.env.NODE_ENV === 'production') {
        await logRequest({
            action,
            appName: 'stripe-store',
            fileName: filePath,  //! this is actually the file path.
            ip,
            additionalLogInfo
        })
    }
}