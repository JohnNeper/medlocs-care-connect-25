import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, AlertTriangle, Info, Plus, Minus, MapPin, Clock } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PharmacyCard from '@/components/pharmacy/PharmacyCard';
import { toast } from '@/components/ui/use-toast';

const MedicationDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - replace with API call
  const medication = {
    id: id || '1',
    name: 'Doliprane 1000mg',
    type: 'Analgésique',
    description: 'Antalgique et antipyrétique efficace contre la douleur et la fièvre',
    minPrice: 2.95,
    maxPrice: 4.50,
    dosage: '1000mg',
    prescriptionRequired: false,
    stock: 'En stock',
    manufacturer: 'Sanofi',
    activeIngredient: 'Paracétamol',
    form: 'Comprimés',
    packaging: 'Boîte de 8 comprimés',
    indications: [
      'Traitement symptomatique de la douleur d\'intensité légère à modérée',
      'Traitement symptomatique de la fièvre'
    ],
    contraindications: [
      'Allergie connue au paracétamol',
      'Insuffisance hépatique sévère'
    ],
    sideEffects: [
      'Réactions allergiques (rare)',
      'Troubles digestifs (rare)',
      'Atteinte hépatique (en cas de surdosage)'
    ],
    dosageInstructions: 'Adultes et enfants de plus de 50 kg : 1 comprimé jusqu\'à 3 fois par jour'
  };

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
      price: 2.95,
      stock: 15
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
      price: 3.20,
      stock: 8
    }
  ];

  const handleAddToCart = () => {
    toast({
      title: t('common.success'),
      description: `${medication.name} ajouté au panier (${quantity}x)`
    });
  };

  const handleReserve = () => {
    navigate(`/reservation/${medication.id}?quantity=${quantity}`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris',
      description: medication.name
    });
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
        {/* Medication Info */}
        <Card className="card-medical">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">{medication.name}</CardTitle>
                <p className="text-muted-foreground mt-1">{medication.manufacturer}</p>
              </div>
              <Badge 
                variant={medication.prescriptionRequired ? "destructive" : "secondary"}
                className="ml-2"
              >
                {medication.prescriptionRequired ? t('medication.prescription') : t('medication.otc')}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <p className="text-lg font-medium text-foreground">{medication.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">{t('medication.type')}</p>
                <p className="font-medium">{medication.type}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('medication.dosage')}</p>
                <p className="font-medium">{medication.dosage}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Forme</p>
                <p className="font-medium">{medication.form}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Conditionnement</p>
                <p className="font-medium">{medication.packaging}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {medication.minPrice.toFixed(2)}€ - {medication.maxPrice.toFixed(2)}€
                </p>
                <p className="text-sm text-muted-foreground">{medication.stock}</p>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                <Clock className="h-3 w-3 mr-1" />
                {medication.stock}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quantity Selection & Actions */}
        <Card className="card-medical">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Quantité:</span>
                <div className="flex items-center border rounded-lg">
                  <MedicalButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </MedicalButton>
                  <span className="px-4 py-1 text-center min-w-[3rem]">{quantity}</span>
                  <MedicalButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </MedicalButton>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <MedicalButton
                  variant="outline"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Panier
                </MedicalButton>
                <MedicalButton onClick={handleReserve}>
                  <MapPin className="h-4 w-4 mr-2" />
                  {t('medication.reserve')}
                </MedicalButton>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informations</TabsTrigger>
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
            <TabsTrigger value="usage">Utilisation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4 mt-6">
            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  {t('medication.indications')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {medication.indications.map((indication, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{indication}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="card-medical border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-destructive">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {t('medication.contraindications')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {medication.contraindications.map((contraindication, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-destructive mt-1">•</span>
                      <span className="text-sm">{contraindication}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pharmacies" className="space-y-4 mt-6">
            <div className="space-y-3">
              {nearbyPharmacies.map((pharmacy) => (
                <div key={pharmacy.id} className="relative">
                  <PharmacyCard {...pharmacy} />
                  <div className="absolute top-4 right-4 bg-background/95 rounded-lg p-2">
                    <p className="text-sm font-medium text-primary">{pharmacy.price.toFixed(2)}€</p>
                    <p className="text-xs text-muted-foreground">{pharmacy.stock} en stock</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-4 mt-6">
            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="text-lg">Posologie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{medication.dosageInstructions}</p>
              </CardContent>
            </Card>

            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="text-lg">{t('medication.sideEffects')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {medication.sideEffects.map((effect, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span className="text-sm">{effect}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Padding */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default MedicationDetail;