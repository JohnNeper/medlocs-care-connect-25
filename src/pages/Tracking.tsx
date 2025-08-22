import { Calendar, Clock, Pill, Bell, Plus, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tracking = () => {
  const currentTreatments = [
    {
      id: "1",
      name: "Doliprane 1000mg",
      dosage: "1 comprimé",
      frequency: "3 fois par jour",
      nextDose: "14:00",
      progress: 65,
      daysRemaining: 7,
      totalDays: 10,
      status: "active",
    },
    {
      id: "2",
      name: "Amoxicilline 500mg",
      dosage: "1 gélule",
      frequency: "2 fois par jour",
      nextDose: "20:00",
      progress: 80,
      daysRemaining: 2,
      totalDays: 8,
      status: "active",
    },
  ];

  const medicationHistory = [
    {
      id: "1",
      name: "Spasfon",
      duration: "5 jours",
      completedDate: "2024-01-10",
      adherence: 95,
      status: "completed",
    },
    {
      id: "2",
      name: "Humex Rhume",
      duration: "7 jours",
      completedDate: "2024-01-05",
      adherence: 88,
      status: "completed",
    },
  ];

  const todaySchedule = [
    { time: "08:00", medication: "Doliprane 1000mg", taken: true },
    { time: "12:00", medication: "Amoxicilline 500mg", taken: true },
    { time: "14:00", medication: "Doliprane 1000mg", taken: false, isNext: true },
    { time: "20:00", medication: "Amoxicilline 500mg", taken: false },
    { time: "22:00", medication: "Doliprane 1000mg", taken: false },
  ];

  const stats = [
    { label: "Adhérence", value: "92%", icon: TrendingUp, color: "text-success" },
    { label: "Prises aujourd'hui", value: "2/5", icon: Pill, color: "text-primary" },
    { label: "Traitements actifs", value: "2", icon: Calendar, color: "text-secondary" },
  ];

  return (
    <div className="min-h-screen bg-background pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Suivi des traitements</h1>
            <p className="text-muted-foreground">Gérez vos médicaments et rappels</p>
          </div>
          <MedicalButton variant="primary" size="icon">
            <Plus className="h-5 w-5" />
          </MedicalButton>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="card-medical">
              <CardContent className="p-4 text-center">
                <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Medication Alert */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-glow">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Prochaine prise dans 30 min</h3>
                <p className="text-sm text-muted-foreground">Doliprane 1000mg - 1 comprimé</p>
              </div>
              <MedicalButton variant="primary" size="sm">
                Rappeler plus tard
              </MedicalButton>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="treatments" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="treatments">Traitements</TabsTrigger>
            <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          {/* Current Treatments */}
          <TabsContent value="treatments" className="space-y-4 mt-6">
            {currentTreatments.map((treatment) => (
              <Card key={treatment.id} className="card-medical">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{treatment.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {treatment.dosage} • {treatment.frequency}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            Prochaine prise: {treatment.nextDose}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-success text-success-foreground">
                        Actif
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progression</span>
                        <span className="font-medium text-foreground">
                          Jour {treatment.totalDays - treatment.daysRemaining + 1} sur {treatment.totalDays}
                        </span>
                      </div>
                      <Progress value={treatment.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {treatment.daysRemaining} jour{treatment.daysRemaining > 1 ? 's' : ''} restant{treatment.daysRemaining > 1 ? 's' : ''}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <MedicalButton variant="outline" size="sm" className="flex-1">
                        <Bell className="h-4 w-4 mr-1" />
                        Modifier rappels
                      </MedicalButton>
                      <MedicalButton variant="primary" size="sm" className="flex-1">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Prise effectuée
                      </MedicalButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Today Schedule */}
          <TabsContent value="today" className="space-y-3 mt-6">
            {todaySchedule.map((dose, index) => (
              <Card 
                key={index} 
                className={`card-medical ${dose.isNext ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        dose.taken 
                          ? 'bg-success/20 text-success' 
                          : dose.isNext 
                            ? 'bg-primary/20 text-primary animate-pulse-glow' 
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {dose.taken ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <Pill className="h-6 w-6" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-foreground">{dose.time}</span>
                        {dose.isNext && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            Suivant
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{dose.medication}</p>
                    </div>

                    {!dose.taken && (
                      <MedicalButton 
                        variant={dose.isNext ? "primary" : "outline"} 
                        size="sm"
                      >
                        {dose.isNext ? "Prendre maintenant" : "Marquer pris"}
                      </MedicalButton>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-4 mt-6">
            {medicationHistory.map((medication) => (
              <Card key={medication.id} className="card-medical">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{medication.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Terminé le {medication.completedDate} • {medication.duration}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <TrendingUp className="h-4 w-4 text-success" />
                          <span className="text-sm font-medium text-success">
                            Adhérence: {medication.adherence}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-success/10 text-success">
                      Terminé
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Add Treatment CTA */}
        <Card className="bg-gradient-card border-primary/20">
          <CardContent className="p-6 text-center">
            <Pill className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Ajouter un traitement</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Scannez votre ordonnance ou ajoutez manuellement
            </p>
            <MedicalButton variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau traitement
            </MedicalButton>
          </CardContent>
        </Card>

        {/* Bottom Padding for Navigation */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Tracking;