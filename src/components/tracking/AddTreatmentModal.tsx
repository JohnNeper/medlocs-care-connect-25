import React, { useState } from 'react';
import { Plus, QrCode, Pill, Calendar, Clock, Camera } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';

interface Treatment {
  name: string;
  dosage: string;
  frequency: string;
  duration: number;
  startDate: string;
  notes: string;
  reminderTimes: string[];
}

interface AddTreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (treatment: Treatment) => void;
}

const AddTreatmentModal: React.FC<AddTreatmentModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [treatment, setTreatment] = useState<Treatment>({
    name: '',
    dosage: '',
    frequency: '',
    duration: 0,
    startDate: new Date().toISOString().split('T')[0],
    notes: '',
    reminderTimes: ['08:00']
  });

  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);

  const handleInputChange = (field: keyof Treatment, value: string | number | string[]) => {
    setTreatment(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!treatment.name || !treatment.dosage || !treatment.frequency || !treatment.duration) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    onAdd(treatment);
    toast({
      title: "Traitement ajouté",
      description: `${treatment.name} a été ajouté à vos traitements`,
    });
    onClose();
    setTreatment({
      name: '',
      dosage: '',
      frequency: '',
      duration: 0,
      startDate: new Date().toISOString().split('T')[0],
      notes: '',
      reminderTimes: ['08:00']
    });
  };

  const handlePhotoScan = () => {
    setIsProcessingPhoto(true);
    // Simulate photo processing
    setTimeout(() => {
      setIsProcessingPhoto(false);
      setTreatment(prev => ({
        ...prev,
        name: 'Doliprane 1000mg',
        dosage: '1 comprimé',
        frequency: '3 fois par jour',
        duration: 7,
        notes: 'Traitement détecté automatiquement depuis l\'ordonnance'
      }));
      toast({
        title: "Ordonnance analysée",
        description: "Les informations ont été extraites automatiquement",
      });
    }, 2000);
  };

  const handleQRScan = () => {
    toast({
      title: "Scanner QR",
      description: "Fonctionnalité bientôt disponible",
    });
  };

  const addReminderTime = () => {
    setTreatment(prev => ({
      ...prev,
      reminderTimes: [...prev.reminderTimes, '12:00']
    }));
  };

  const updateReminderTime = (index: number, time: string) => {
    setTreatment(prev => ({
      ...prev,
      reminderTimes: prev.reminderTimes.map((t, i) => i === index ? time : t)
    }));
  };

  const removeReminderTime = (index: number) => {
    if (treatment.reminderTimes.length > 1) {
      setTreatment(prev => ({
        ...prev,
        reminderTimes: prev.reminderTimes.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Pill className="h-5 w-5 text-primary" />
            <span>Ajouter un traitement</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual">Manuel</TabsTrigger>
            <TabsTrigger value="photo">Photo</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du médicament *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Doliprane 1000mg"
                  value={treatment.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage *</Label>
                <Input
                  id="dosage"
                  placeholder="Ex: 1 comprimé"
                  value={treatment.dosage}
                  onChange={(e) => handleInputChange('dosage', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Fréquence *</Label>
                <Select value={treatment.frequency} onValueChange={(value) => handleInputChange('frequency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 fois par jour">1 fois par jour</SelectItem>
                    <SelectItem value="2 fois par jour">2 fois par jour</SelectItem>
                    <SelectItem value="3 fois par jour">3 fois par jour</SelectItem>
                    <SelectItem value="4 fois par jour">4 fois par jour</SelectItem>
                    <SelectItem value="Si besoin">Si besoin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Durée (jours) *</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  placeholder="7"
                  value={treatment.duration || ''}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input
                id="startDate"
                type="date"
                value={treatment.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Heures de rappel</Label>
              {treatment.reminderTimes.map((time, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => updateReminderTime(index, e.target.value)}
                    className="flex-1"
                  />
                  {treatment.reminderTimes.length > 1 && (
                    <MedicalButton
                      variant="ghost"
                      size="sm"
                      onClick={() => removeReminderTime(index)}
                    >
                      ×
                    </MedicalButton>
                  )}
                </div>
              ))}
              <MedicalButton
                variant="outline"
                size="sm"
                onClick={addReminderTime}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-1" />
                Ajouter un rappel
              </MedicalButton>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                placeholder="Instructions particulières, effets secondaires à surveiller..."
                value={treatment.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="photo" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Scanner une ordonnance</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                {isProcessingPhoto ? (
                  <div>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Analyse de l'ordonnance en cours...</p>
                  </div>
                ) : (
                  <>
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Prenez une photo de votre ordonnance pour extraire automatiquement les informations
                    </p>
                    <MedicalButton variant="primary" onClick={handlePhotoScan}>
                      <Camera className="h-4 w-4 mr-2" />
                      Prendre une photo
                    </MedicalButton>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Show manual form if data was extracted */}
            {treatment.name && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold text-foreground">Informations détectées</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="photo-name">Médicament</Label>
                    <Input
                      id="photo-name"
                      value={treatment.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="photo-dosage">Dosage</Label>
                    <Input
                      id="photo-dosage"
                      value={treatment.dosage}
                      onChange={(e) => handleInputChange('dosage', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="qr" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Scanner un QR Code</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <QrCode className="h-16 w-16 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Scannez le QR code présent sur votre médicament ou ordonnance
                </p>
                <MedicalButton variant="primary" onClick={handleQRScan}>
                  <QrCode className="h-4 w-4 mr-2" />
                  Scanner QR Code
                </MedicalButton>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <MedicalButton variant="outline" onClick={onClose}>
            Annuler
          </MedicalButton>
          <MedicalButton variant="primary" onClick={handleSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter le traitement
          </MedicalButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTreatmentModal;