import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, Check, Star } from "lucide-react";

const IPTV = () => {
  const features = [
    "Plus de 10 000 chaînes en direct",
    "Qualité 4K Ultra HD",
    "Compatible tous appareils",
    "Support 24/7",
    "Mise à jour automatique",
    "Aucune coupure",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 hero-gradient py-16 px-4 relative overflow-hidden">
        <div className="glow-orb glow-orb-primary w-[400px] h-[400px] -top-20 -right-20" />
        <div className="glow-orb glow-orb-accent w-[300px] h-[300px] bottom-20 -left-20" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12 opacity-0 animate-fade-in">
            <div className="inline-flex items-center gap-2 badge-glass rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold">Offre Premium</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 font-display">
              <span className="text-foreground">Ton </span>
              <span className="text-gradient">IPTV</span>
              <span className="text-foreground"> Premium</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Accède à des milliers de chaînes en direct avec une qualité exceptionnelle
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                  <div className="p-1.5 bg-live/20 rounded-lg">
                    <Check className="w-4 h-4 text-live" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="https://discord.gg/Y9rVMh4wxg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-hero text-lg px-12"
              >
                <Zap className="w-5 h-5" />
                Commander maintenant
              </a>
              <p className="text-xs text-muted-foreground mt-4">
                Contacte-nous sur Discord pour plus d'informations
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IPTV;
