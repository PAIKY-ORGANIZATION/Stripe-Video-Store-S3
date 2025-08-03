import { prisma } from "@/lib/prisma";

export const handleEventIdempotency = async (eventId: string, eventType: string)=>{

    //% If the event exists, return true. Else, save the event and return false.

    const existingEvent = await prisma.processedStripeEvents.findFirst({
        where: { id: eventId },
    });
    if (existingEvent) {true}

    //* Store event ID to handle idempotency:
    await prisma.processedStripeEvents.create({
        data: {
            id: eventId,
            eventType: eventType,
        },
    });

    return  false
}