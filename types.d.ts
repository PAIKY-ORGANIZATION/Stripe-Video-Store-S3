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
    videoIds: string
    userId: string
}


//* For the cart in localstorage
type CartVideoObject = {
    videoId: string,
    videoTitle: string,
    videoPrice: number
}