import { AboutUsSection } from "@/components/Home/About/About";
import Banner from "@/components/Home/Banner/Banner";
import Category from "@/components/Home/Category/Category";
import CTASection from "@/components/Home/Commnunity/Community";

import { HowItWorksSection } from "@/components/Home/HowWork/Work";
import FeaturedProducts from "@/components/Home/Product/Product";
import { TestimonialsSection } from "@/components/Home/Testomonial/Tesntomoniel";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <Category />
      <FeaturedProducts/>
      <HowItWorksSection/>
      <AboutUsSection/>
    <CTASection/>
    <TestimonialsSection/>
    </div>
  );
}
