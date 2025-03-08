import Image from "next/image";
import banner from "@/assets/undraw_shopping-bags_nfsf.svg"
import { Button } from "../ui/button";
const Banner = () => {
    return (
        <div
      className=" container mx-auto border-2 border-[#10b981]  p-4 rounded-3xl mt-[300px]  "
    >
      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="pl-12">
          <h1 className="text-4xl font-bold leading-normal">
            Don&apos;t Miss Out on <br /> These Unbeatable Black <br /> Friday
            Deals!
          </h1>
          <p className="my-3">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>

          <Button className="rounded-full mr-2">Buy Now</Button>
          <Button className="rounded-full" variant="outline">
            All Products
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <Image src={banner} alt="cup image" width={500} height={500} className="rounded-3xl" />
        </div>
      </div>
    </div>
    );
};

export default Banner;