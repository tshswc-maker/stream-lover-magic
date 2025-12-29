import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CGU = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 font-display">
            Conditions Générales d'Utilisation
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptation des conditions</h2>
              <p>
                En accédant à ce site, vous acceptez d'être lié par ces conditions d'utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Description du service</h2>
              <p>
                Ce site fournit un accès à des flux de streaming en direct. Le service est fourni 
                "tel quel" sans garantie de disponibilité continue.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Utilisation acceptable</h2>
              <p>
                Vous vous engagez à utiliser ce service de manière légale et conforme aux lois 
                applicables dans votre juridiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Limitation de responsabilité</h2>
              <p>
                Nous ne sommes pas responsables des contenus diffusés via les flux externes. 
                L'utilisation de ce service est à vos propres risques.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Modifications</h2>
              <p>
                Nous nous réservons le droit de modifier ces conditions à tout moment. 
                Les modifications prennent effet dès leur publication.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CGU;
