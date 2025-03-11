 export interface ILoginData {
    email: string;
    password: string;

}

export interface IUser{
    _id: string;
    name: string;
    email: string;
    phone_number: string;
    password: string;
    role: string;
    status: string;
    isBlocked: boolean;
    image:string
}