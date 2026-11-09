
import HeroSection from '@/components/shared/HeroSection'
import { getAdvertisements } from "@/lib/actions/tickets";
import AdvertisementSection from "@/components/shared/AdvertisementSection";
import WhyChooseUs from '@/components/shared/WhyChooseUs'
import CustomerReviews from "@/components/shared/CustomerReviews";
import PopularDestinations from "@/components/shared/PopularDestination";

export default async function Home() {
  const tickets = await getAdvertisements();
  return (
    <div className="dark:bg-[#171717]">
      <HeroSection/>
      <AdvertisementSection tickets={tickets} />
      <PopularDestinations/>
      <WhyChooseUs/>
      <CustomerReviews/>
    </div>
  );
}
