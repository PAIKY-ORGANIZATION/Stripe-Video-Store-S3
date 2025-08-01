import { getRelevantSessionData } from "@/actions/stripe/get-relevant-session-data";
import { getStripeSessionById } from "@/actions/stripe/get-stripe-session-by-id";
import Success from "@/components/Success";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

type Props = {
	// params: Promise<{CHECKOUT_SESSION_ID: string}>
    searchParams:  Promise<{session_id: string}>
};

export default async function SuccessPage({ searchParams }: Props) {

    const {session_id} = await searchParams

	const checkoutSession: Stripe.Checkout.Session = await getStripeSessionById(session_id)

    const relevantSessionData = await getRelevantSessionData(checkoutSession)

	return (
		<Success relevantSessionData={relevantSessionData}></Success>
	);
}
