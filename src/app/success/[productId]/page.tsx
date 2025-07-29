import Success from "@/components/Success";
import { prisma } from "@/lib/prisma";

type Props = {
	params: {
		productId: Promise<string>;
	};
};

export default async function SuccessPage({ params }: Props) {

    const id = await params.productId

    const video = await prisma.video.findFirst({
        where: {id}
    })


    if(!video){
        return <p> Something went wrong creating the success page :(</p>
    }


	return (
		<Success video={video}></Success>
	);
}
