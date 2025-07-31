import Success from "@/components/Success";
import { prisma } from "@/lib/prisma";

type Props = {
	params: Promise<{CHECKOUT_SESSION_ID: string}>
};

export default async function SuccessPage({ params }: Props) {

    const {CHECKOUT_SESSION_ID} = await params

    // const video = await prisma.video.findFirst({
    //     where: {id: productId}
    // })
    

    console.log({CHECKOUT_SESSION_ID});
    



    // if(!video){
    //     return <p> Something went wrong creating the success page :(</p>
    // }


	return (
		// <Success video={video}></Success>
        <>test</>
	);
}
