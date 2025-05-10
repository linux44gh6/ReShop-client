import { AboutUsSection } from "@/components/Home/About/About";
import Banner from "@/components/Home/Banner/Banner";
import Category from "@/components/Home/Category/Category";
import { JoinCommunitySection } from "@/components/Home/Commnunity/Community";
import { HowItWorksSection } from "@/components/Home/HowWork/Work";
import FeaturedProducts from "@/components/Home/Product/Product";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <Category />
      <FeaturedProducts/>
      <HowItWorksSection/>
      <AboutUsSection/>
      <JoinCommunitySection/>
    </div>
  );
}
