import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Hls from "hls.js";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// CORS proxy list - will try them in order
const CORS_PROXIES = [
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://proxy.cors.sh/${url}`,
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
  const [retryCount, setRetryCount] = useState(0);

  const streamUrl = searchParams.get("url") || "";
  const title = searchParams.get("title") || "Stream";

  const getProxiedUrl = (url: string, proxyIndex: number): string => {
    if (proxyIndex >= CORS_PROXIES.length) {
      return url; // Try direct as last resort
    }
    return CORS_PROXIES[proxyIndex](url);
  };

  const loadStream = (proxyIndex: number) => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    setIsLoading(true);
    setError(null);

    const proxiedUrl = getProxiedUrl(streamUrl, proxyIndex);
    console.log(`Trying proxy ${proxyIndex}:`, proxiedUrl);

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        xhrSetup: (xhr) => {
          xhr.withCredentials = false;
        },
        manifestLoadingMaxRetry: 2,
        manifestLoadingRetryDelay: 1000,
        levelLoadingMaxRetry: 2,
        fragLoadingMaxRetry: 2,
      });

      hlsRef.current = hls;

      hls.loadSource(proxiedUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("Stream loaded successfully");
        setIsLoading(false);
        setError(null);
        video.play().catch(console.error);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error("HLS Error:", data);
        if (data.fatal) {
          hls.destroy();
          
          // Try next proxy
          if (proxyIndex < CORS_PROXIES.length) {
            console.log(`Proxy ${proxyIndex} failed, trying next...`);
            setCurrentProxyIndex(proxyIndex + 1);
            loadStream(proxyIndex + 1);
          } else {
            setError("Impossible de charger le flux. Tous les proxys ont échoué.");
            setIsLoading(false);
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = proxiedUrl;
      video.addEventListener("loadedmetadata", () => {
        setIsLoading(false);
        video.play().catch(console.error);
      });
      video.addEventListener("error", () => {
        if (proxyIndex < CORS_PROXIES.length) {
          setCurrentProxyIndex(proxyIndex + 1);
          loadStream(proxyIndex + 1);
        } else {
          setError("Erreur de lecture du flux");
          setIsLoading(false);
        }
      });
    } else {
      setError("Votre navigateur ne supporte pas la lecture HLS");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStream(0);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [streamUrl]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setCurrentProxyIndex(0);
    loadStream(0);
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
              {currentProxyIndex > 0 ? `Tentative ${currentProxyIndex + 1}/${CORS_PROXIES.length + 1}...` : 'Chargement du flux...'}
            </p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 p-4">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <p className="text-foreground text-center text-lg mb-2">{error}</p>
            <p className="text-muted-foreground text-center text-sm mb-4 max-w-md break-all">
              URL: {streamUrl}
            </p>
            <div className="flex gap-3">
              <Button onClick={handleRetry} variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </Button>
              <Button onClick={() => navigate(-1)} variant="outline">
                Retour
              </Button>
            </div>
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
