type Props = {
    params: {
        productId: Promise<string>
    }
}


export default async function SuccessPage({params}: Props) {
    return (
        <div>Thanks for your purchasing {params.productId}</div>
    )
}