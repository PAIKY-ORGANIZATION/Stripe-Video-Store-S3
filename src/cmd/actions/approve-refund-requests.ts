import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe";
import inquirer from "inquirer";




export const approveRefundRequests = async ()=>{

    const refunds = await prisma.refunds.findMany({

        where: {
            solved: false
        },

        include: {
            purchases: {
                select: {
                    user: {
                        select: {
                            email: true
                        }
                    },
                    video: {
                        select: {
                            title: true
                        }
                    },
                    paymentIntentId: true,
                }
            }
        }
    })
    

    console.dir(refunds, {depth: null});
    
    const answer = await inquirer.prompt([
        {
            message: 'What refund do you  want to manage?',
            type: 'list',
            name: 'refundId',
            choices: refunds.map((refund)=> refund.id)
        },
        {
            message: 'What do you want to do?',
            type: 'list',
            name: 'action',
            choices: ['Approve', 'Deny']
        }
    ])

    if(answer.action === 'Approve'){
        //* From one of the purchases with the same paymentIntentId (linked to the same refund), get the paymentIntentId
        const payment_intent = refunds.find((refund)=> refund.id === answer.refundId)?.purchases[0]?.paymentIntentId

        await stripe.refunds.create({
            payment_intent: payment_intent
        })        
    }



    return
}