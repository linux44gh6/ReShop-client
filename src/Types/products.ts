export interface IProduct {
    _id:string;
    title: string;
    description: string;
    price: number;
    images: string[];
    category:{
        _id:string;
        name:string
    }
    status: string;
    rating:number;
}