import { prisma } from "@/lib/prisma";

export const handleEventIdempotency = async (eventId: string, eventType: string)=>{

    const existingEvent = await prisma.processedStripeEvents.findFirst({
        where: { id: eventId },
    });
    if (existingEvent) {
        return new Response('Received', { status: 200 });
    }

    //* Store event ID to handle idempotency:
    await prisma.processedStripeEvents.create({
        data: {
            id: eventId,
            eventType: eventType,
        },
    });

    return
}