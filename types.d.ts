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







type Merch = {
    title: string,
    description: string,
    price: number,
    currency: string,
    image: string
}


type ActionResponse = {
    success: boolean,
    message: string,
    data?: any
}



type PurchaseMetadata = {
    videoId: string
    userId: string
}