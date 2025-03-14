import Image from "next/image";
import banner from "@/assets/undraw_shopping-bags_nfsf.svg"
import { Button } from "../../ui/button";
import Link from "next/link";
const Banner = () => {
  return (
    <div
      className=" container mx-auto border-2 border-[#10b981]  p-4 rounded-3xl mt-10 "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 items-center p-1 md:p-0 lg:p-0">
        <div className="pl-0 md:pl-12 lg:pl-12">
          <h1 className="text-xl md:text-4xl lg:text-4xl font-bold leading-normal">
          Grab exclusive discounts and massive savings before they’re gone!
          </h1>
          <p className="my-3">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>

          <Link href={'/all-product'}>
          <Button className="rounded-full mr-2 cursor-pointer">Buy Now</Button></Link>
          <Link href={'/all-product'}>
          <Button className="rounded-full cursor-pointer" variant="outline">
            All Products
          </Button></Link>
        </div>
        <div className="flex items-center justify-center">
          <Image src={banner} alt="cup image" width={500} height={500} className="rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Banner;