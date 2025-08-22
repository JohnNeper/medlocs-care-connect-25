import { MapPin, TrendingUp, Search, Filter } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PharmacyCard from "@/components/pharmacy/PharmacyCard";
import MedicationCard from "@/components/medication/MedicationCard";
import PromotionalCarousel from "@/components/home/PromotionalCarousel";
import heroImage from "@/assets/hero-medical.jpg";

const Home = () => {
  const popularMedications = [
    {
      id: "1",
      name: "Doliprane 1000mg",
      type: "Analgésique",
      description: "Antalgique et antipyrétique efficace contre la douleur et la fièvre",
      minPrice: 2.95,
      maxPrice: 4.50,
      isPopular: true,
      pharmacyCount: 15,
    },
    {
      id: "2",
      name: "Spasfon",
      type: "Antispasmodique",
      description: "Soulage les douleurs abdominales et les troubles digestifs",
      minPrice: 3.20,
      maxPrice: 5.80,
      pharmacyCount: 12,
    },
    {
      id: "3",
      name: "Humex",
      type: "Rhume",
      description: "Traitement des symptômes du rhume et de la congestion nasale",
      minPrice: 4.15,
      maxPrice: 6.90,
      isPopular: true,
      pharmacyCount: 18,
    },
  ];

  const nearbyPharmacies = [
    {
      id: "1",
      name: "Pharmacie du Centre",
      address: "15 Rue de la République, 75001 Paris",
      distance: "0.2 km",
      rating: 4.8,
      isOpen: true,
      openUntil: "19h00",
      phone: "01 42 36 75 89",
      hasPromo: true,
      promoText: "-10%",
    },
    {
      id: "2",
      name: "Pharmacie Saint-Michel",
      address: "8 Boulevard Saint-Michel, 75005 Paris",
      distance: "0.5 km",
      rating: 4.6,
      isOpen: true,
      openUntil: "20h00",
      phone: "01 43 25 61 48",
    },
    {
      id: "3",
      name: "Pharmacie Voltaire",
      address: "32 Avenue Voltaire, 75011 Paris",
      distance: "0.8 km",
      rating: 4.7,
      isOpen: false,
      phone: "01 48 05 92 37",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden rounded-b-3xl">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-xl">
            <h1 className="text-3xl font-bold mb-3 animate-fade-up">
              Trouvez vos médicaments près de chez vous
            </h1>
            <p className="text-white/90 mb-6 animate-fade-up delay-100">
              Localisez, réservez et consultez un pharmacien en toute simplicité
            </p>
            
            {/* Quick Search */}
            <div className="relative animate-fade-up delay-200">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Rechercher un médicament..."
                className="pl-12 bg-white/95 border-0 shadow-medium"
              />
              <MedicalButton 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
              </MedicalButton>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Promotional Carousel */}
        <section>
          <PromotionalCarousel />
        </section>

        {/* Location Banner */}
        <section className="bg-gradient-card rounded-2xl p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Votre position</p>
                <p className="text-sm text-muted-foreground">Paris 1er arrondissement</p>
              </div>
            </div>
            <MedicalButton variant="outline" size="sm">
              Changer
            </MedicalButton>
          </div>
        </section>

        {/* Popular Medications */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Médicaments populaires</h2>
            </div>
            <MedicalButton variant="ghost" size="sm">
              Voir tout
            </MedicalButton>
          </div>
          
          <div className="space-y-3">
            {popularMedications.map((medication) => (
              <MedicationCard key={medication.id} {...medication} />
            ))}
          </div>
        </section>

        {/* Nearby Pharmacies */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Pharmacies près de vous</h2>
            </div>
            <div className="flex space-x-2">
              <MedicalButton variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filtres
              </MedicalButton>
              <MedicalButton variant="ghost" size="sm">
                Voir tout
              </MedicalButton>
            </div>
          </div>
          
          <div className="space-y-3">
            {nearbyPharmacies.map((pharmacy) => (
              <PharmacyCard key={pharmacy.id} {...pharmacy} />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
          <MedicalButton variant="primary" size="lg" className="h-16 flex-col">
            <Search className="h-6 w-6 mb-1" />
            <span>Recherche avancée</span>
          </MedicalButton>
          
          <MedicalButton variant="secondary" size="lg" className="h-16 flex-col">
            <MapPin className="h-6 w-6 mb-1" />
            <span>Pharmacies de garde</span>
          </MedicalButton>
        </section>

        {/* Bottom Padding for Navigation */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Home;