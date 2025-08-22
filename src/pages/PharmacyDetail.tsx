import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Phone, MapPin, Clock, Star, Navigation, MessageCircle, Camera, Calendar } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MedicationCard from '@/components/medication/MedicationCard';
import { toast } from '@/components/ui/use-toast';

const PharmacyDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - replace with API call
  const pharmacy = {
    id: id || '1',
    name: "Pharmacie du Centre",
    address: "15 Rue de la République, 75001 Paris",
    distance: "0.2 km",
    rating: 4.8,
    reviewCount: 124,
    isOpen: true,
    openUntil: "19h00",
    phone: "01 42 36 75 89",
    email: "contact@pharmacie-centre.fr",
    website: "www.pharmacie-centre.fr",
    description: "Pharmacie moderne située au cœur de Paris, proposant une large gamme de médicaments et de services de santé.",
    services: [
      "Conseil pharmaceutique",
      "Téléconsultation",
      "Préparations magistrales", 
      "Orthopédie",
      "Matériel médical",
      "Vaccination"
    ],
    hours: {
      monday: "8h30 - 19h30",
      tuesday: "8h30 - 19h30", 
      wednesday: "8h30 - 19h30",
      thursday: "8h30 - 19h30",
      friday: "8h30 - 19h30",
      saturday: "9h00 - 19h00",
      sunday: "Fermé"
    },
    pharmacists: [
      {
        name: "Dr. Marie Dubois",
        title: "Pharmacien titulaire",
        specialties: ["Dermatologie", "Pédiatrie"]
      },
      {
        name: "Dr. Pierre Martin",
        title: "Pharmacien adjoint", 
        specialties: ["Orthopédie", "Diabétologie"]
      }
    ]
  };

  const availableMedications = [
    {
      id: "1",
      name: "Doliprane 1000mg",
      type: "Analgésique",
      description: "Antalgique et antipyrétique efficace",
      minPrice: 2.95,
      maxPrice: 2.95,
      stock: 15,
      pharmacyCount: 1,
    },
    {
      id: "2", 
      name: "Spasfon",
      type: "Antispasmodique",
      description: "Soulage les douleurs abdominales",
      minPrice: 3.20,
      maxPrice: 3.20,
      stock: 8,
      pharmacyCount: 1,
    },
    {
      id: "3",
      name: "Humex",
      type: "Rhume",
      description: "Traitement des symptômes du rhume",
      minPrice: 4.15,
      maxPrice: 4.15,
      stock: 12,
      pharmacyCount: 1,
    }
  ];

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris',
      description: pharmacy.name
    });
  };

  const handleCall = () => {
    window.location.href = `tel:${pharmacy.phone}`;
  };

  const handleDirections = () => {
    const address = encodeURIComponent(pharmacy.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  const handleAppointment = () => {
    navigate(`/appointment/${pharmacy.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <MedicalButton
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </MedicalButton>
          
          <MedicalButton
            variant="ghost"
            size="sm"
            onClick={toggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
          </MedicalButton>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Pharmacy Info */}
        <Card className="card-medical">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-foreground">{pharmacy.name}</h1>
                  <p className="text-muted-foreground mt-1">{pharmacy.address}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{pharmacy.rating}</span>
                      <span className="ml-1 text-sm text-muted-foreground">({pharmacy.reviewCount} avis)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="ml-1 text-sm text-muted-foreground">{pharmacy.distance}</span>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={pharmacy.isOpen ? "secondary" : "destructive"}
                  className={pharmacy.isOpen ? "bg-success/10 text-success" : ""}
                >
                  {pharmacy.isOpen ? 
                    `${t('pharmacy.open')} ${t('pharmacy.until')} ${pharmacy.openUntil}` : 
                    t('pharmacy.closed')
                  }
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">{pharmacy.description}</p>

              <Separator />

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <MedicalButton
                  variant="outline"
                  onClick={handleCall}
                  className="h-12"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {t('pharmacy.call')}
                </MedicalButton>
                
                <MedicalButton
                  variant="outline"
                  onClick={handleDirections}
                  className="h-12"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  {t('pharmacy.directions')}
                </MedicalButton>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MedicalButton
                  onClick={() => navigate('/telemedecine')}
                  className="h-12"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t('pharmacy.contact')}
                </MedicalButton>
                
                <MedicalButton
                  variant="secondary"
                  onClick={handleAppointment}
                  className="h-12"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Rendez-vous
                </MedicalButton>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Tabs defaultValue="medications" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="medications">Médicaments</TabsTrigger>
            <TabsTrigger value="info">Infos</TabsTrigger>
            <TabsTrigger value="hours">Horaires</TabsTrigger>
            <TabsTrigger value="team">Équipe</TabsTrigger>
          </TabsList>
          
          <TabsContent value="medications" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t('pharmacy.availableMeds')}</h3>
              <Badge variant="outline">{availableMedications.length} produits</Badge>
            </div>
            
            <div className="space-y-3">
              {availableMedications.map((medication) => (
                <div key={medication.id} className="relative">
                  <MedicationCard {...medication} />
                  <div className="absolute top-4 right-4 bg-background/95 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">{medication.stock} en stock</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="space-y-4 mt-6">
            <Card className="card-medical">
              <CardHeader>
                <CardTitle>Coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{pharmacy.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{pharmacy.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm">📧</span>
                  <span className="text-sm">{pharmacy.email}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-medical">
              <CardHeader>
                <CardTitle>{t('pharmacy.services')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {pharmacy.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="justify-center p-2">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hours" className="space-y-4 mt-6">
            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  {t('pharmacy.hours')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(pharmacy.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">{day}</span>
                      <span className="text-sm text-muted-foreground">{hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-4 mt-6">
            {pharmacy.pharmacists.map((pharmacist, index) => (
              <Card key={index} className="card-medical">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {pharmacist.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{pharmacist.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{pharmacist.title}</p>
                      <div className="flex flex-wrap gap-1">
                        {pharmacist.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <MedicalButton variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </MedicalButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Bottom Padding */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default PharmacyDetail;