import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Hls from "hls.js";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Loader2, AlertCircle, RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Custom loader that proxies all requests through CORS proxy
const createProxiedLoader = (proxyUrl: string) => {
  return class ProxiedLoader extends Hls.DefaultConfig.loader {
    load(context: any, config: any, callbacks: any) {
      // Proxy all URLs (manifest and segments)
      const originalUrl = context.url;
      
      // Only proxy if URL is http (not https or already proxied)
      if (originalUrl.startsWith('http://') || originalUrl.startsWith('https://')) {
        context.url = `${proxyUrl}${encodeURIComponent(originalUrl)}`;
      }
      
      super.load(context, config, callbacks);
    }
  };
};

// CORS proxy configurations - using ones that support streaming
const CORS_PROXIES = [
  {
    name: "corsproxy.io",
    getUrl: (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    createLoader: () => createProxiedLoader("https://corsproxy.io/?"),
  },
  {
    name: "allorigins",
    getUrl: (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    createLoader: () => createProxiedLoader("https://api.allorigins.win/raw?url="),
  },
  {
    name: "cors-anywhere (demo)",
    getUrl: (url: string) => `https://cors-anywhere.herokuapp.com/${url}`,
    createLoader: () => createProxiedLoader("https://cors-anywhere.herokuapp.com/"),
  },
];

const Player = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [currentProxyIndex, setCurrentProxyIndex] = useState(0);
  const [showExternalOption, setShowExternalOption] = useState(false);

  const streamUrl = searchParams.get("url") || "";
  const title = searchParams.get("title") || "Stream";

  const loadStream = useCallback((proxyIndex: number) => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    setIsLoading(true);
    setError(null);
    setShowExternalOption(false);

    const proxy = CORS_PROXIES[proxyIndex];
    if (!proxy) {
      // All proxies failed
      setError("Impossible de charger le flux via les proxys CORS.");
      setShowExternalOption(true);
      setIsLoading(false);
      return;
    }

    console.log(`Trying proxy ${proxyIndex + 1}/${CORS_PROXIES.length}: ${proxy.name}`);

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        // Use custom loader that proxies ALL requests (manifest + segments)
        loader: proxy.createLoader(),
        xhrSetup: (xhr) => {
          xhr.withCredentials = false;
        },
        manifestLoadingMaxRetry: 1,
        manifestLoadingRetryDelay: 500,
        manifestLoadingTimeOut: 15000,
        levelLoadingMaxRetry: 2,
        fragLoadingMaxRetry: 2,
      });

      hlsRef.current = hls;

      // Load with proxied URL for initial manifest
      const proxiedUrl = proxy.getUrl(streamUrl);
      hls.loadSource(proxiedUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("Stream loaded successfully via", proxy.name);
        setIsLoading(false);
        setError(null);
        video.play().catch(console.error);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error("HLS Error:", data);
        if (data.fatal) {
          hls.destroy();
          
          // Try next proxy
          const nextIndex = proxyIndex + 1;
          if (nextIndex < CORS_PROXIES.length) {
            console.log(`Proxy ${proxy.name} failed, trying next...`);
            setCurrentProxyIndex(nextIndex);
            loadStream(nextIndex);
          } else {
            setError("Impossible de charger le flux. Le serveur de stream peut être hors ligne ou bloque les connexions.");
            setShowExternalOption(true);
            setIsLoading(false);
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari) - try direct first
      video.src = streamUrl;
      
      const handleError = () => {
        setError("Erreur de lecture du flux");
        setShowExternalOption(true);
        setIsLoading(false);
      };
      
      video.addEventListener("loadedmetadata", () => {
        setIsLoading(false);
        video.play().catch(console.error);
      });
      video.addEventListener("error", handleError);
    } else {
      setError("Votre navigateur ne supporte pas la lecture HLS");
      setIsLoading(false);
    }
  }, [streamUrl]);

  useEffect(() => {
    loadStream(0);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [loadStream]);

  const handleRetry = () => {
    setCurrentProxyIndex(0);
    loadStream(0);
  };

  const openInExternalPlayer = () => {
    // Copy stream URL to clipboard and show instructions
    navigator.clipboard.writeText(streamUrl).then(() => {
      alert("URL copiée ! Collez-la dans VLC ou un autre lecteur compatible.");
    }).catch(() => {
      // Fallback: open in new tab
      window.open(streamUrl, '_blank');
    });
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Auto-hide controls
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-background to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-foreground hover:bg-foreground/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
        </div>
      </header>

      {/* Video Player */}
      <div ref={containerRef} className="flex-1 flex items-center justify-center relative bg-background">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground text-sm">
              {currentProxyIndex > 0 
                ? `Tentative ${currentProxyIndex + 1}/${CORS_PROXIES.length} (${CORS_PROXIES[currentProxyIndex]?.name})...` 
                : 'Chargement du flux...'}
            </p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 p-4">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <p className="text-foreground text-center text-lg mb-2">{error}</p>
            <p className="text-muted-foreground text-center text-xs mb-4 max-w-md break-all">
              URL: {streamUrl}
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={handleRetry} variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </Button>
              
              {showExternalOption && (
                <Button onClick={openInExternalPlayer} variant="outline" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Copier pour VLC
                </Button>
              )}
              
              <Button onClick={() => navigate(-1)} variant="outline">
                Retour
              </Button>
            </div>

            {showExternalOption && (
              <p className="text-muted-foreground text-center text-xs mt-4 max-w-md">
                Conseil : Ouvrez ce lien dans VLC Media Player ou un autre lecteur compatible m3u8 pour contourner les restrictions CORS.
              </p>
            )}
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full max-h-screen object-contain"
          playsInline
          onClick={togglePlay}
        />

        {/* Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent transition-opacity duration-300 ${showControls && !error ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-foreground hover:bg-foreground/10"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-foreground hover:bg-foreground/10"
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-foreground hover:bg-foreground/10"
            >
              <Maximize className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
