import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';



//prettier-ignore
export const getRelevantSessionData = async (checkoutSession: Stripe.Checkout.Session): Promise<RelevantSessionData> => {

	//% We accept a stripe session object and return formatted relevant information about it.

	const items = await stripe.checkout.sessions.listLineItems(checkoutSession.id,
		{ expand: ['data.price.product']} //$  We add this to get all: "name", "description", "images", "metadata"}
	); 

	const relevantSessionData: RelevantSessionData = {
		date: new Date(checkoutSession.created * 1000).toISOString().slice(0, 10),
		total: checkoutSession.amount_total as number,
		checkoutSessionId: checkoutSession.id,
		paymentIntentId: checkoutSession.payment_intent as string,
		videos: items.data.map((item) => {
			const product = item.price?.product as Stripe.Product; //! I don't know if the type of this could change.
			return {
				title: product.name,
				image: product.images[0],
				videoId: product?.metadata?.videoId,
				videoPrice: item.price?.unit_amount as number,
			};
		}),
	};
	
	return relevantSessionData;
};
