import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Player from "./pages/Player";
import IPTV from "./pages/IPTV";
import CGU from "./pages/CGU";
import Confidentialite from "./pages/Confidentialite";
import DMCA from "./pages/DMCA";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/player" element={<Player />} />
          <Route path="/iptv" element={<IPTV />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/dmca" element={<DMCA />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
