export interface IWishlist {
   _id?: string;
   products:{
       _id: string;
       title: string;
       description: string;
       price: number;
       images: string[];
       category: {
           _id: string;
           name: string;
       };
       userID: string;
       status: string;
   }
   userID: string;
}