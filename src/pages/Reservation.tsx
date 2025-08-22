import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, Upload, CheckCircle } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Reservation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [quantity, setQuantity] = useState(parseInt(searchParams.get('quantity') || '1'));
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [reservationId, setReservationId] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Mock data
  const medication = {
    id: id || '1',
    name: 'Doliprane 1000mg',
    type: 'Analgésique',
    price: 2.95,
    prescriptionRequired: false
  };

  const nearbyPharmacies = [
    {
      id: '1',
      name: 'Pharmacie du Centre',
      address: '15 Rue de la République, 75001 Paris',
      distance: '0.2 km',
      price: 2.95,
      availableSlots: [
        '09:00', '10:30', '14:00', '15:30', '17:00'
      ]
    },
    {
      id: '2',
      name: 'Pharmacie Saint-Michel',
      address: '8 Boulevard Saint-Michel, 75005 Paris',
      distance: '0.5 km',
      price: 3.20,
      availableSlots: [
        '09:30', '11:00', '14:30', '16:00'
      ]
    }
  ];

  const selectedPharmacyData = nearbyPharmacies.find(p => p.id === selectedPharmacy);
  const total = selectedPharmacyData ? selectedPharmacyData.price * quantity : 0;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Erreur',
          description: 'Le fichier est trop volumineux (max 5MB)',
          variant: 'destructive'
        });
        return;
      }
      setPrescriptionFile(file);
    }
  };

  const handleReservation = () => {
    if (!selectedPharmacy || !selectedTime || !selectedDate) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs requis',
        variant: 'destructive'
      });
      return;
    }

    if (medication.prescriptionRequired && !prescriptionFile) {
      toast({
        title: 'Erreur', 
        description: 'Ordonnance requise pour ce médicament',
        variant: 'destructive'
      });
      return;
    }

    // Simulate reservation
    const newReservationId = 'RES-' + Date.now();
    setReservationId(newReservationId);
    setStep(3);

    toast({
      title: t('reservation.success'),
      description: `Référence: ${newReservationId}`
    });
  };

  if (!isAuthenticated) return null;

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md card-medical text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Réservation confirmée</h2>
            <p className="text-muted-foreground mb-4">
              Votre réservation a été enregistrée avec succès
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium">Référence</p>
              <p className="text-lg font-bold text-primary">{reservationId}</p>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Médicament:</span>
                <span className="text-sm font-medium">{medication.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pharmacie:</span>
                <span className="text-sm font-medium">{selectedPharmacyData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Date de retrait:</span>
                <span className="text-sm font-medium">{selectedDate} à {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="text-sm font-bold text-primary">{total.toFixed(2)}€</span>
              </div>
            </div>
            <MedicalButton 
              onClick={() => navigate('/')}
              className="w-full mt-6"
            >
              Retour à l'accueil
            </MedicalButton>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          
          <div className="flex items-center space-x-2">
            <Badge variant={step >= 1 ? "default" : "outline"}>1</Badge>
            <div className="w-8 h-0.5 bg-border" />
            <Badge variant={step >= 2 ? "default" : "outline"}>2</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">{t('reservation.title')}</h1>
          <p className="text-muted-foreground mt-1">{medication.name}</p>
        </div>

        {/* Medication Summary */}
        <Card className="card-medical">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{medication.name}</h3>
                <p className="text-sm text-muted-foreground">{medication.type}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{medication.price.toFixed(2)}€</p>
                <p className="text-sm text-muted-foreground">Quantité: {quantity}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {step === 1 && (
          <div className="space-y-6">
            {/* Pharmacy Selection */}
            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {t('reservation.selectPharmacy')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPharmacy} onValueChange={setSelectedPharmacy}>
                  {nearbyPharmacies.map((pharmacy) => (
                    <div key={pharmacy.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                      <RadioGroupItem value={pharmacy.id} id={pharmacy.id} />
                      <Label htmlFor={pharmacy.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{pharmacy.name}</p>
                            <p className="text-sm text-muted-foreground">{pharmacy.address}</p>
                            <p className="text-xs text-muted-foreground">{pharmacy.distance}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{pharmacy.price.toFixed(2)}€</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <MedicalButton
              onClick={() => setStep(2)}
              className="w-full"
              disabled={!selectedPharmacy}
            >
              {t('common.next')}
            </MedicalButton>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Date & Time Selection */}
            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {t('reservation.selectTime')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="date">Date de retrait</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <Label>Créneau disponible</Label>
                    <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className="mt-2">
                      <div className="grid grid-cols-3 gap-2">
                        {selectedPharmacyData?.availableSlots.map((slot) => (
                          <div key={slot} className="flex items-center space-x-2">
                            <RadioGroupItem value={slot} id={slot} />
                            <Label htmlFor={slot} className="cursor-pointer">
                              {slot}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Prescription Upload */}
            {medication.prescriptionRequired && (
              <Card className="card-medical border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-600">
                    <Upload className="h-5 w-5 mr-2" />
                    {t('reservation.uploadPrescription')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-muted-foreground">
                      Formats acceptés: PDF, JPG, PNG (max 5MB)
                    </p>
                    {prescriptionFile && (
                      <p className="text-sm text-success">
                        ✓ {prescriptionFile.name}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Summary */}
            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Récapitulatif
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{medication.name} x{quantity}</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>{t('reservation.total')}</span>
                    <span className="text-primary">{total.toFixed(2)}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <MedicalButton
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                {t('common.back')}
              </MedicalButton>
              <MedicalButton
                onClick={handleReservation}
                className="flex-1"
                disabled={!selectedTime || !selectedDate || (medication.prescriptionRequired && !prescriptionFile)}
              >
                {t('reservation.confirm')}
              </MedicalButton>
            </div>
          </div>
        )}

        {/* Bottom Padding */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Reservation;