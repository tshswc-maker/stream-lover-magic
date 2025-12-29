import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Confidentialite = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 font-display">
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Collecte des données</h2>
              <p>
                Nous ne collectons aucune donnée personnelle identifiable. Aucune inscription 
                n'est requise pour utiliser nos services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Cookies</h2>
              <p>
                Ce site peut utiliser des cookies techniques essentiels au fonctionnement du service. 
                Aucun cookie de tracking ou publicitaire n'est utilisé.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Données de navigation</h2>
              <p>
                Les données de navigation standard (adresse IP, navigateur) peuvent être 
                temporairement enregistrées pour des raisons de sécurité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Partage des données</h2>
              <p>
                Nous ne partageons, vendons ou louons aucune donnée à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Contact</h2>
              <p>
                Pour toute question concernant cette politique, contactez-nous via Discord.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Confidentialite;
