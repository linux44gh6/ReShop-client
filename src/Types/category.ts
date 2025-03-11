export interface ICategory {
    _id:string,
    name:string,
    icon?:string[]
}

export interface ICategoryResponse {
    data:ICategory[];
}