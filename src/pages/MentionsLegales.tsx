import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 font-display">
            Mentions Légales
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Éditeur du site</h2>
              <p>
                Ce site est édité à titre personnel et non commercial.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Hébergement</h2>
              <p>
                Ce site est hébergé par des services d'hébergement web tiers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Propriété intellectuelle</h2>
              <p>
                L'ensemble des éléments constituant ce site (textes, graphismes, logiciels, etc.) 
                sont la propriété de leurs auteurs respectifs. Toute reproduction est interdite 
                sans autorisation préalable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Responsabilité</h2>
              <p>
                L'éditeur ne peut être tenu responsable des erreurs ou omissions sur le site, 
                ni des dommages directs ou indirects résultant de l'utilisation du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Liens externes</h2>
              <p>
                Ce site peut contenir des liens vers des sites externes. L'éditeur n'est pas 
                responsable du contenu de ces sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
              <p>
                Pour toute question, veuillez nous contacter via notre serveur Discord.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentionsLegales;
