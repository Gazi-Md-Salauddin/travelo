import Image from "next/image";
import HeroSection from '@/components/shared/HeroSection'
import { getAdvertisements } from "@/lib/actions/tickets";
import AdvertisementSection from "@/components/AdvertisementSection";
import WhyChooseUs from '@/components/shared/WhyChooseUs'

export default async function Home() {
  const tickets = await getAdvertisements();
  return (
    <div>
      <HeroSection/>
      <AdvertisementSection tickets={tickets} />
      <WhyChooseUs/>
    </div>
  );
}
