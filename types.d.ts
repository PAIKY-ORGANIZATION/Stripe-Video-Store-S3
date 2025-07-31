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
    videoId: string
    userId: string
}