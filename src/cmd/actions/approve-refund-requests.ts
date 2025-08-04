import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe";
import inquirer from "inquirer";




export const approveRefundRequests = async ()=>{

    const refunds = await prisma.refunds.findMany({ //*  Find refunds to display

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

    if(refunds.length === 0) { console.log('No refund requests ☺️'); return}
    
    console.dir(refunds, {depth: null}); //! Don't remove this
    
    const answer = await inquirer.prompt([
        {
            message: 'What refund do you  want to approve?',
            type: 'list',
            name: 'refundId',
            choices: refunds.map((refund)=> refund.id)
        },

    ])

    //* From one of the purchases with the same paymentIntentId (linked to the same refund), get the paymentIntentId
    const payment_intent = refunds.find((refund)=> refund.id === answer.refundId)?.purchases[0]?.paymentIntentId


    //¡ REFUND AMOUNT MISSING
    //! It sees that if you don't pass an amount, it will refund the full amount.
    await stripe.refunds.create({
        payment_intent: payment_intent,
        metadata: {
            postgresRefundId: answer.refundId //% This will be used to find the POSTGRES REFUND in the webhook and:
            //% 1- Mark it as solved
            //% 2 Attach the real Stripe refundId to it 
        } as RefundMetadata
    })        



    return
}