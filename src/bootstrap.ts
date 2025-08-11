import dotenv from 'dotenv'


const setENV = ()=>{

    //$ process.env.ENVIRONMENT is defined based on script ran from package.json
    //$ Example: Running "npm run dev_local" will set process.env.ENVIRONMENT to "dev" which will load "config/dev.env"
    dotenv.config({path: `config/${process.env.ENVIRONMENT}.env`}) 
    
    //$ These are shared between all environments, example: PORT
    dotenv.config({path: 'config/shared.env'})


     //* Check for required environment variables or throw stop execution.   
    
    const requiredVars = [
        "OBJECT_STORAGE_BUCKET_REGION",
        "OBJECT_STORAGE_ACCESS_KEY",
        "OBJECT_STORAGE_SECRET_KEY",
        "OBJECT_STORAGE_BUCKET_NAME",
        "NEXTAUTH_URL",
        "NEXTAUTH_SECRET",
        "STRIPE_SECRET_KEY",
        "STRIPE_SIGNING_SECRET",
        "CLIENT_SECRET_GOOGLE",
        "CLIENT_ID_GOOGLE",
        "APP_HOST",
        'BREVO_API_KEY',
        'ADMIN_EMAIL'
    ];

    requiredVars.forEach((varName)=>{
        if(!process.env[varName]){
            throw new Error(`Missing required environment variable: ${varName}`)
        }
    })

}

setENV()