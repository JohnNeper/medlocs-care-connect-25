import { MapPin, Filter, Search, Clock, Star, Navigation } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PharmacyCard from "@/components/pharmacy/PharmacyCard";

const Pharmacies = () => {
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
    {
      id: "4",
      name: "Pharmacie Bastille",
      address: "45 Rue de la Bastille, 75004 Paris",
      distance: "1.2 km",
      rating: 4.5,
      isOpen: true,
      openUntil: "22h00",
      phone: "01 42 77 83 92",
      hasPromo: true,
      promoText: "Livraison gratuite",
    },
  ];

  const emergencyPharmacies = [
    {
      id: "5",
      name: "Pharmacie de Garde - Châtelet",
      address: "12 Rue de Rivoli, 75001 Paris",
      distance: "1.5 km",
      rating: 4.3,
      isOpen: true,
      openUntil: "24h/24",
      phone: "01 42 33 15 67",
    },
    {
      id: "6",
      name: "Pharmacie de Garde - Opéra",
      address: "8 Boulevard des Capucines, 75009 Paris",
      distance: "2.1 km",
      rating: 4.4,
      isOpen: true,
      openUntil: "Jusqu'à 2h00",
      phone: "01 47 42 88 19",
    },
  ];

  const filters = [
    { label: "Ouvertes maintenant", count: 12 },
    { label: "Livraison disponible", count: 8 },
    { label: "Téléconsultation", count: 6 },
    { label: "Promotions", count: 4 },
  ];

  return (
    <div className="min-h-screen bg-background pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Pharmacies</h1>
          
          {/* Location and Search */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 p-3 bg-gradient-card rounded-xl">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">Paris 1er arrondissement</p>
                <p className="text-sm text-muted-foreground">Position actuelle</p>
              </div>
              <MedicalButton variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-1" />
                Changer
              </MedicalButton>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Rechercher une pharmacie..."
                className="pl-12 pr-24"
              />
              <MedicalButton 
                variant="ghost" 
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="h-4 w-4" />
              </MedicalButton>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge 
              key={filter.label}
              variant="secondary" 
              className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-2"
            >
              {filter.label} ({filter.count})
            </Badge>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-destructive/10 to-warning/10 rounded-2xl p-4 border border-destructive/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Besoin d'une pharmacie de garde ?</h3>
              <p className="text-sm text-muted-foreground">
                Consultez les pharmacies ouvertes 24h/24 et en urgence
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="nearby" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nearby" className="flex items-center space-x-2">
              <span>À proximité</span>
              <Badge variant="outline">{nearbyPharmacies.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center space-x-2">
              <span>De garde</span>
              <Badge variant="outline">{emergencyPharmacies.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nearby" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {nearbyPharmacies.length} pharmacies trouvées
              </p>
              <MedicalButton variant="ghost" size="sm">
                <MapPin className="h-4 w-4 mr-1" />
                Vue carte
              </MedicalButton>
            </div>
            
            <div className="space-y-3">
              {nearbyPharmacies.map((pharmacy) => (
                <PharmacyCard key={pharmacy.id} {...pharmacy} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-4 mt-6">
            <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground">Pharmacies de garde</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ces pharmacies sont ouvertes en dehors des horaires habituels. 
                    Des frais supplémentaires peuvent s'appliquer.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {emergencyPharmacies.map((pharmacy) => (
                <PharmacyCard key={pharmacy.id} {...pharmacy} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Map View CTA */}
        <div className="bg-gradient-card rounded-2xl p-6 text-center shadow-soft">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2">Voir sur la carte</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Visualisez toutes les pharmacies sur une carte interactive
          </p>
          <MedicalButton variant="primary">
            <MapPin className="h-4 w-4 mr-2" />
            Ouvrir la carte
          </MedicalButton>
        </div>

        {/* Bottom Padding for Navigation */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Pharmacies;