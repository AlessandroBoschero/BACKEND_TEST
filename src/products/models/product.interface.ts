export interface Product {
    code: string
    description: string
    um: string
    price: number
}

export interface SavedProduct extends Product {
    id: string
}

export interface Products {
    [key: string]: SavedProduct
}
