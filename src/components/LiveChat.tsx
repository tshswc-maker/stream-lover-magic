import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  color: string;
}

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
  "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F",
  "#BB8FCE", "#85C1E9", "#F8B500", "#00CED1"
];

const USERNAMES = [
  "StreamFan", "ViewerPro", "ChatMaster", "SportLover",
  "NightOwl", "FastTyper", "CoolViewer", "HappyWatcher"
];

const generateUsername = () => {
  const name = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
  const num = Math.floor(Math.random() * 999);
  return `${name}${num}`;
};

const generateColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [username] = useState(() => generateUsername());
  const [userColor] = useState(() => generateColor());
  const [viewerCount] = useState(() => Math.floor(Math.random() * 500) + 100);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate incoming messages
  useEffect(() => {
    const simulatedMessages = [
      "Allez l'équipe ! 🔥",
      "Quel match incroyable",
      "Super qualité de stream 👍",
      "Quelqu'un d'autre a du lag ?",
      "GOAAAL ! ⚽",
      "Merci pour le stream !",
      "C'est parti ! 💪",
      "Trop fort ce joueur",
      "Vive le sport !",
      "Enfin un bon stream",
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const randomMessage = simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)];
        const randomUser = generateUsername();
        const randomColor = generateColor();
        
        setMessages(prev => [...prev.slice(-50), {
          id: Date.now().toString(),
          username: randomUser,
          content: randomMessage,
          timestamp: new Date(),
          color: randomColor,
        }]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      username,
      content: newMessage.trim(),
      timestamp: new Date(),
      color: userColor,
    };

    setMessages(prev => [...prev.slice(-50), message]);
    setNewMessage("");
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 gap-2 bg-primary hover:bg-primary/90 shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
        Chat
      </Button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 w-full sm:w-80 h-96 sm:h-[500px] sm:bottom-4 sm:right-4 z-50 flex flex-col bg-card border border-border rounded-t-lg sm:rounded-lg shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary/10 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Chat en direct</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{viewerCount}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3" ref={scrollRef}>
        <div className="space-y-2">
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">
              Soyez le premier à envoyer un message ! 💬
            </p>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-2 text-sm animate-in slide-in-from-bottom-2 duration-200">
              <span className="font-semibold shrink-0" style={{ color: msg.color }}>
                {msg.username}:
              </span>
              <span className="text-foreground/90 break-words">{msg.content}</span>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t border-border bg-background/50">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground">Connecté en tant que</span>
          <span className="text-xs font-semibold" style={{ color: userColor }}>{username}</span>
        </div>
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Envoyer un message..."
            className="flex-1 bg-background border-border text-sm"
            maxLength={200}
          />
          <Button
            onClick={handleSend}
            size="icon"
            disabled={!newMessage.trim()}
            className="bg-primary hover:bg-primary/90 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
