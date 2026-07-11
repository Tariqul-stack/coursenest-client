import CategoriesSection from '@/components/home/CategoriesSection';
import FAQSection from '@/components/home/FAQSection';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import StatsSection from '@/components/home/StatsSection';
import TeacherCTA from '@/components/home/TeacherCTA';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedCourses/>
      <CategoriesSection/>
      <HowItWorks/>
      <StatsSection/>
      <Testimonials/>
      <TeacherCTA/>
      <FAQSection/>
    </main>
  );
}