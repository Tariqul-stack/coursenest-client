import CategoriesSection from '@/components/home/CategoriesSection';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import StatsSection from '@/components/home/StatsSection';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection/>
      <HowItWorks/>
      <StatsSection/>
      <Testimonials/>
    </main>
  );
}