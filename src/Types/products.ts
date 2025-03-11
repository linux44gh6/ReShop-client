/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProduct {
    userID: any;
    data: any;
    _id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    category: {
        _id: string;
        name: string;
    };
    status: string;
    rating: number;
}

export type TData=IProduct[]
// If API returns an object like { data: IProduct[] }
export interface IProductResponse {
    data: IProduct[];
}

export type TProducts={
    data: IProduct
}