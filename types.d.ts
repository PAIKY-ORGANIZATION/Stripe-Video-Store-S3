type VideoProduct = {
    title: string,
    author: string,
    s3VideoKey: string,
    thumbnailLocalPath: string,
    description: string,
    likes: number,
    views: number,
    price: number,
}







type ActionResponse = {
    success: boolean,
    message: string,
    data?: any
}



type PurchaseMetadata = {
    userId: string
}


//* For the cart React Context
type CartVideoObject = {
    videoId: string,
    videoTitle: string,
    videoPrice: number
}

type RelevantSessionData = {
    date: string;
    total: number;
    checkoutSessionId: string;
    paymentIntentId: string;
    wasRefunded: boolean;
    videos: {
        title: string;
        image: string;
        videoId: string;
        videoPrice: number;
    }[];
}



