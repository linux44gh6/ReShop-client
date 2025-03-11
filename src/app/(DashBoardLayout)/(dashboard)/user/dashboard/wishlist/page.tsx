
import { WishlistTable } from "@/components/ui/Core/wishlistTable/wishlistTable";
import { getUser } from "@/Service/auth";
import { getWishlist } from "@/Service/Wishlist";

const WishlistPage = async() => {
    const user = await getUser()
    console.log(user?._id);
    const data = await getWishlist(user?._id as string)
    console.log(data);
    return (
        <div>
            <WishlistTable data={data} />                 
        </div>
    );
};

export default WishlistPage;