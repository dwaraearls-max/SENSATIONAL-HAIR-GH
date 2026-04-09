import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { StickySiteNav } from "@/components/layout/StickySiteNav";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { HotDeals } from "@/components/sections/HotDeals";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <main>
        <Hero />
        <FeaturedProducts />
        <WhyChoose />
        <HowItWorks />
        <HotDeals />
        <ServiceAreas />
        <InquiryForm />
        <Stats />
        <FAQ />
        <FinalCTA />
      </main>
      <StickySiteNav />
      <Footer />
    </>
  );
}
