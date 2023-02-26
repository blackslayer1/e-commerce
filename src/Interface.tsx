export default interface ProductIT{
    id: number,
    title: string,
    price: string,
    description: string,
    category: string,
    imageUrl: string,
    rating: {rate: number, total: number}
}