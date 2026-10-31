import Image from "next/image";
import HeroSection from '@/components/shared/HeroSection'
import { getAdvertisements } from "@/lib/actions/tickets";
import AdvertisementSection from "@/components/shared/AdvertisementSection";
import WhyChooseUs from '@/components/shared/WhyChooseUs'
import CustomerReviews from "@/components/shared/CustomerReviews";

export default async function Home() {
  const tickets = await getAdvertisements();
  return (
    <div className="dark:bg-[#171717]">
      <HeroSection/>
      <AdvertisementSection tickets={tickets} />
      <WhyChooseUs/>
      <CustomerReviews/>
    </div>
  );
}
