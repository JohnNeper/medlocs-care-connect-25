import { useState } from "react";
import { Search as SearchIcon, Filter, MapPin, Clock, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MedicalButton } from "@/components/ui/medical-button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MedicationCard from "@/components/medication/MedicationCard";
import PharmacyCard from "@/components/pharmacy/PharmacyCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("medications");

  const searchResults = {
    medications: [
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
        name: "Advil 400mg",
        type: "Anti-inflammatoire",
        description: "Anti-inflammatoire non stéroïdien pour douleurs et inflammations",
        minPrice: 3.80,
        maxPrice: 6.20,
        pharmacyCount: 12,
      },
      {
        id: "3",
        name: "Aspégic 1000mg",
        type: "Analgésique",
        description: "Acide acétylsalicylique pour douleurs et fièvre",
        minPrice: 2.15,
        maxPrice: 3.90,
        pharmacyCount: 8,
      },
    ],
    pharmacies: [
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
    ],
  };

  const popularSearches = [
    "Doliprane", "Spasfon", "Humex", "Advil", "Aspégic", 
    "Smecta", "Gaviscon", "Nurofen", "Efferalgan"
  ];

  return (
    <div className="min-h-screen bg-background pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Search Header */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Recherche</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Rechercher un médicament ou une pharmacie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-24 h-12 text-base"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <MedicalButton variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </MedicalButton>
              <MedicalButton size="sm">
                <SearchIcon className="h-4 w-4" />
              </MedicalButton>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        {!searchQuery && (
          <section>
            <h2 className="text-lg font-semibold mb-3 text-foreground">Recherches populaires</h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <Badge 
                  key={term}
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Search Tabs */}
        {searchQuery && (
          <Tabs defaultValue="medications" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="medications" className="flex items-center space-x-2">
                <span>Médicaments</span>
                <Badge variant="outline" className="ml-1">
                  {searchResults.medications.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pharmacies" className="flex items-center space-x-2">
                <span>Pharmacies</span>
                <Badge variant="outline" className="ml-1">
                  {searchResults.pharmacies.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="medications" className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {searchResults.medications.length} médicament(s) trouvé(s)
                </p>
                <MedicalButton variant="ghost" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Trier
                </MedicalButton>
              </div>
              
              <div className="space-y-3">
                {searchResults.medications.map((medication) => (
                  <MedicationCard key={medication.id} {...medication} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pharmacies" className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {searchResults.pharmacies.length} pharmacie(s) trouvée(s)
                </p>
                <MedicalButton variant="ghost" size="sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  Carte
                </MedicalButton>
              </div>
              
              <div className="space-y-3">
                {searchResults.pharmacies.map((pharmacy) => (
                  <PharmacyCard key={pharmacy.id} {...pharmacy} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Search Tips */}
        {!searchQuery && (
          <section className="bg-gradient-card rounded-2xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold mb-3 text-foreground">Conseils de recherche</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <SearchIcon className="h-4 w-4 mt-0.5 text-primary" />
                <span>Utilisez le nom commercial ou la molécule active</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>Filtrez par distance et disponibilité</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 text-primary" />
                <span>Vérifiez les horaires d'ouverture</span>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Padding for Navigation */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Search;