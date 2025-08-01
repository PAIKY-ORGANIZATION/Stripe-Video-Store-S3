import { prisma } from "@/lib/prisma";
import { sendEmail } from "../brevo/send-email";
import { getRelevantSessionData } from "./get-relevant-session-data";
import {Stripe} from "stripe";

export const handleSuccessSessionWebhook = async (event: Stripe.CheckoutSessionCompletedEvent) => {
	//* Prevent idempotency by preventing a duplicated Event ID.
	const existingEvent = await prisma.processedStripeEvents.findFirst({
		where: { id: event.id },
	});
	if (existingEvent) {
		return new Response('Received', { status: 200 });
	}

	//* Store event ID to handle idempotency:
	await prisma.processedStripeEvents.create({
		data: {
			id: event.id,
			eventType: event.type,
		},
	});

	//*  Store purchase/s to database
	const data = event.data.object;
	const metadata = data.metadata as PurchaseMetadata; //$ Assuming this was added when creating the Stripe session.
	const paymentIntentId = data.payment_intent as string;
	const checkoutSessionId = data.id;

	const relevantSessionData: RelevantSessionData =
		await getRelevantSessionData(checkoutSessionId); //$ The productId's are stored as metadata per each product

	for (const video of relevantSessionData.videos) {
		//% Even though it's a single session purchases are stored product-wise. Stripe will handle the "concept" of a cart, not us.
		await prisma.purchase.create({
			data: {
				userId: metadata.userId,
				videoId: video.videoId,
				checkoutSessionId,
				paymentIntentId,
			},
		});
	}

	await sendEmail({
		content: 'Thanks for your purchase! \n Your payment intent is:' + paymentIntentId,
		receiverEmail: data.customer_details?.email!,
		subject: 'Thanks for your purchase!',
	});
	return new Response('Received', { status: 200 });
};
