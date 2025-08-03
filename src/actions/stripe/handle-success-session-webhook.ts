import { prisma } from "@/lib/prisma";
import { sendEmail } from "../brevo/send-email";
import { getRelevantSessionData } from "./get-relevant-session-data";
import {Stripe} from "stripe";
import { handleEventIdempotency } from "./handle-event-idempotency";

export const handleSuccessSessionWebhook = async (event: Stripe.CheckoutSessionCompletedEvent) => {
	//* Prevent idempotency by preventing a duplicated Event ID.
	await handleEventIdempotency(event.id, event.type)

	//*  Store purchase/s to database
	const checkoutSession: Stripe.Checkout.Session = event.data.object;

	const metadata = checkoutSession.metadata as PurchaseMetadata; //$ Assuming this was added when creating the Stripe session.
	const paymentIntentId = checkoutSession.payment_intent as string;
	const checkoutSessionId = checkoutSession.id;

	const relevantSessionData: RelevantSessionData = await getRelevantSessionData(checkoutSession); //$ The productId's are stored as metadata per each product

	for (const video of relevantSessionData.videos) {
		//% Even though it's a single session, purchases are stored product-wise in our db. Stripe will handle the "concept" of a cart, not us.
		await prisma.purchase.create({
			data: {
				userId: metadata.userId,
				videoId: video.videoId,
				checkoutSessionId,
				paymentIntentId,
                success: true
			},
		});
	}

	await sendEmail({
		content: 'Thanks for your purchase! \n Your payment intent is:' + paymentIntentId,
		receiverEmail: checkoutSession.customer_details?.email!, //$ Could also query Postgres to get the user's email.
		subject: 'Thanks for your purchase!',
	});
	return new Response('Received', { status: 200 });
};
