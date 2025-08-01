import {TransactionalEmailsApi, TransactionalEmailsApiApiKeys} from '@getbrevo/brevo'


export const brevoEmailApiInstance = new TransactionalEmailsApi()

brevoEmailApiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!)