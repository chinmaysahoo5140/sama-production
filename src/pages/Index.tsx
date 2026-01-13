import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import { HeroSection } from '@/components/home/HeroSection';
import { PromoStrip } from '@/components/home/PromoStrip';
import { MostSellingProducts } from '@/components/home/MostSellingProducts';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Features } from '@/components/home/Features';
import { Testimonials } from '@/components/home/Testimonials';
import { useAuthPrompt } from '@/hooks/useAuthPrompt';

const Index = () => {
  // Show auth modal after 5 seconds if user is not logged in
  useAuthPrompt(5000);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <AuthModal />
      <main>
        <HeroSection />
        <PromoStrip />
        <MostSellingProducts />
        <Features />
        <FeaturedProducts />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
