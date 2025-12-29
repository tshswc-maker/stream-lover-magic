import HeroLanding from "@/components/HeroLanding";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <HeroLanding />
      <Footer />
    </div>
  );
};

export default Index;
