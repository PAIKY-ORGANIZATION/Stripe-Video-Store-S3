import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';




export const getRelevantSessionData = async (checkoutSessionId: string): Promise<RelevantSessionData> => {
	const session = await stripe.checkout.sessions.retrieve(
		checkoutSessionId
	);
	const items = await stripe.checkout.sessions.listLineItems(
		checkoutSessionId,
		{
			expand: ['data.price.product'], //$  We add this to get all: "name", "description", "images", "metadata"
		}
	); //% Another way might be to get the video purchased from db.


	//?  Return that session and items. Show a list of all purchases and include a button to see details.
	const relevantSessionData = {
		date: new Date(session.created).toISOString(),
		total: session.amount_total as number,
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
