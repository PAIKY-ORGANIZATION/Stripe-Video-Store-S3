import { brevoEmailApiInstance } from "@/lib/brevo"
import { SendSmtpEmail } from "@getbrevo/brevo"

type Props = {
    content: string,
    receiverEmail: string,
    subject: string,

}

export const sendEmail = async ({content, receiverEmail, subject}: Props)=>{

    const email = new SendSmtpEmail()
    email.sender = {email: "miguel.mendez@miguel-mendez.click", name: "miguel"}
    email.to = [{email: receiverEmail, name: 'UNKNOWN'}]
    email.subject = subject
    email.htmlContent = content

    await brevoEmailApiInstance.sendTransacEmail(email)
    return
}