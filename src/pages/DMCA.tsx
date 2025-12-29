import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle, Mail } from "lucide-react";

const DMCA = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl sm:text-4xl font-bold font-display">
              DMCA - Avis de retrait
            </h1>
          </div>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section className="bg-card/50 border border-border/50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Avertissement</h2>
              <p>
                Ce site ne stocke aucun contenu multimédia. Tous les flux sont hébergés par des 
                services tiers. Nous agissons uniquement comme agrégateur de liens.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Procédure de retrait</h2>
              <p>
                Si vous êtes titulaire de droits d'auteur et que vous pensez qu'un contenu 
                accessible via notre site viole vos droits, veuillez nous contacter avec les 
                informations suivantes :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Identification du contenu protégé</li>
                <li>URL du contenu concerné sur notre site</li>
                <li>Vos coordonnées de contact</li>
                <li>Une déclaration de bonne foi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
              <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl">
                <Mail className="w-5 h-5 text-primary" />
                <span>Contactez-nous via Discord pour toute demande DMCA</span>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Délai de traitement</h2>
              <p>
                Nous nous engageons à traiter toutes les demandes valides dans un délai de 48 heures.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DMCA;
