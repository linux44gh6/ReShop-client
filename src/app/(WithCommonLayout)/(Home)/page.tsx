import Banner from "@/components/Home/Banner/Banner";
import Category from "@/components/Home/Category/Category";
import FeaturedProducts from "@/components/Home/Product/Product";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <Category />
      <FeaturedProducts/>
    </div>
  );
}
