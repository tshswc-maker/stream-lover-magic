import { ArrowRight, AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import StreamCard from "./StreamCard";

const HeroLanding = () => {
  const [showAlert, setShowAlert] = useState(true);

  const backupStreams = [
    {
      id: "1",
      title: "Match Live",
      category: "Sport",
      viewers: 1247,
      isLive: true,
      thumbnail: "https://media.ouest-france.fr/v1/pictures/MjAyNTEyZDZjZjNiYTkyZjFiNDlkZjljMmVjMDljNDZhMTU0MzI?width=1260&height=708&focuspoint=50%2C25&cropresize=1&client_id=bpeditorial&sign=98c65fbdf236cbeca6801e743bd000cff274e3deec659f6eca7e7d365349bb96",
      url: "http://line.tx-4k.com:80/live/56d71fe8a1/c42199ee4b/506552.m3u8",
    },
    {
      id: "2",
      title: "Événement Spécial",
      category: "Divertissement",
      viewers: 856,
      isLive: true,
      thumbnail: "https://www.lequipe.fr/_medias/img-photo-jpg/-/1500000002055328/0-828-552-75/30f8a.jpg",
      url: "http://line.tx-4k.com:80/live/56d71fe8a1/c42199ee4b/506552.m3u8",
    },
    {
      id: "3",
      title: "Stream Gaming",
      category: "Gaming",
      viewers: 423,
      isLive: true,
      thumbnail: "https://i2-prod.manchestereveningnews.co.uk/incoming/article18923807.ece/ALTERNATES/s1200/1_VILMUN.jpg",
      url: "http://line.tx-4k.com:80/live/56d71fe8a1/c42199ee4b/506552.m3u8",
    },
    {
      id: "4",
      title: "Ligue des Champions",
      category: "Football",
      viewers: 1892,
      isLive: true,
      thumbnail: "https://e0.365dm.com/23/09/1600x900/skysports-real-madrid-atletico_6289241.jpg",
      url: "http://line.tx-4k.com:80/live/56d71fe8a1/c42199ee4b/506552.m3u8",
    },
    {
      id: "5",
      title: "Match de Boxe",
      category: "Combat",
      viewers: 2134,
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800",
      url: "http://line.tx-4k.com:80/live/56d71fe8a1/c42199ee4b/506552.m3u8",
    },
    {
      id: "6",
      title: "Coupe du Monde",
      category: "Sport",
      viewers: 1567,
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      url: "http://line.tx-4k.com:80/live/56d71fe8a1/c42199ee4b/506552.m3u8",
    },
  ];

  return (
    <section className="flex-1 hero-gradient flex flex-col px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="glow-orb glow-orb-primary w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] -top-32 sm:-top-40 -left-32 sm:-left-40" />
      <div className="glow-orb glow-orb-accent w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] -bottom-40 sm:-bottom-60 -right-32 sm:-right-40 animate-delay-300" />
      <div className="glow-orb glow-orb-primary w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '2s' }} />

      {/* Warning Alert - Top Right (responsive) */}
      {showAlert && (
        <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-4 z-50 sm:max-w-sm animate-fade-in">
          <div className="bg-card/95 backdrop-blur-xl border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-2xl shadow-primary/10">
            <button
              onClick={() => setShowAlert(false)}
              className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 mb-2 sm:mb-3 pr-6">
              <div className="p-1.5 bg-amber-400/10 rounded-lg">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              </div>
              <span className="font-bold text-xs sm:text-sm tracking-wide">SITE TEMPORAIRE</span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
              Rejoins notre canal secours pour être toujours informé !
            </p>

            <a
              href="https://discord.gg/Y9rVMh4wxg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-hero w-full text-xs sm:text-sm py-2.5 sm:py-3"
            >
              Rejoindre
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 pt-12 sm:pt-0">
        <div className="max-w-[700px] w-full text-center px-2">
          {/* Status Badge */}
          <div
            className="inline-flex items-center gap-2 sm:gap-2.5 badge-glass rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="live-dot w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full animate-glow" />
            <span className="text-xs sm:text-sm font-semibold text-foreground/90 tracking-wide">
              Live maintenant
            </span>
          </div>

          {/* Main Title */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 sm:mb-6 opacity-0 animate-fade-in font-display"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-foreground">meru</span>
            <span className="text-gradient">TV</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground mb-8 sm:mb-10 opacity-0 animate-fade-in max-w-xs sm:max-w-md mx-auto leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            Votre destination ultime pour le streaming live
          </p>

        </div>
      </div>

      {/* Streams Section */}
      <div
        id="streams"
        className="w-full max-w-6xl mx-auto opacity-0 animate-fade-in relative z-10"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-live/10 border border-live/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-live shadow-[0_0_8px_hsl(142_76%_45%/0.8)] animate-glow" />
            <span className="text-xs sm:text-sm font-semibold text-live">En direct</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Streams disponibles</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {backupStreams.map((stream, index) => (
            <div
              key={stream.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.6 + index * 0.15}s` }}
            >
              <StreamCard
                title={stream.title}
                category={stream.category}
                viewers={stream.viewers}
                isLive={stream.isLive}
                thumbnail={stream.thumbnail}
                url={stream.url}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroLanding;
