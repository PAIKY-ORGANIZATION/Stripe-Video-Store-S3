import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const bodyBinary = await req.text()

    console.log({bodyBinary});
    

}