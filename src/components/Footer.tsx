import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    { to: "/mentions-legales", label: "Mentions légales" },
    { to: "/cgu", label: "CGU" },
    { to: "/confidentialite", label: "Confidentialité" },
    { to: "/dmca", label: "DMCA" },
  ];

  return (
    <footer className="border-t border-border/50 py-8 bg-card/30">
      <div className="container mx-auto px-4">
        <nav className="flex flex-wrap items-center justify-center gap-2">
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground hover:text-primary px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
