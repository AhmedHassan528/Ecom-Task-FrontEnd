export interface Iproduct {
    id?: number
    productCode: string
    name: string
    category: string
    imagePath: string
    price: number
    minimumQuantity: number
    discountRate: number
}

export interface ProductCreateRequest {
    productCode: string
    name: string
    category: string
    imagePath: string
    price: number
    minimumQuantity: number
    discountRate: number
}

export interface ProductUpdateRequest {
    id: number
    productCode: string
    name: string
    category: string
    imagePath: string
    price: number
    minimumQuantity: number
    discountRate: number
}
