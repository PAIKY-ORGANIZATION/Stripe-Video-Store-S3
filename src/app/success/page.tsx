import { getRelevantSessionData } from "@/actions/get-relevant-session-data";
import Success from "@/components/Success";
import { prisma } from "@/lib/prisma";

type Props = {
	// params: Promise<{CHECKOUT_SESSION_ID: string}>
    searchParams:  Promise<{session_id: string}>
};

export default async function SuccessPage({ searchParams }: Props) {

    const {session_id} = await searchParams


    const relevantSessionData = await getRelevantSessionData(session_id)

	return (
		<Success relevantSessionData={relevantSessionData}></Success>
	);
}
