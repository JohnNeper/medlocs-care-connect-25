import { User, Settings, Heart, Clock, Bell, Shield, LogOut, Edit2 } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const userStats = [
    { label: "Commandes", value: "12", icon: Clock },
    { label: "Favoris", value: "8", icon: Heart },
    { label: "Points", value: "250", icon: Settings },
  ];

  const menuItems = [
    {
      icon: User,
      label: "Informations personnelles",
      description: "Gérez vos données personnelles",
      action: () => {},
    },
    {
      icon: Heart,
      label: "Mes favoris",
      description: "Pharmacies et médicaments favoris",
      action: () => {},
    },
    {
      icon: Clock,
      label: "Historique des commandes",
      description: "Vos achats et réservations",
      action: () => {},
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Paramètres des notifications",
      action: () => {},
    },
    {
      icon: Shield,
      label: "Confidentialité",
      description: "Sécurité et données personnelles",
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Profile Header */}
        <Card className="card-medical overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-foreground">Jean Dupont</h1>
                  <Badge className="bg-success text-success-foreground">Vérifié</Badge>
                </div>
                <p className="text-muted-foreground">jean.dupont@example.com</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Membre depuis Mars 2023
                </p>
              </div>
              
              <MedicalButton variant="ghost" size="icon">
                <Edit2 className="h-4 w-4" />
              </MedicalButton>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          {userStats.map((stat) => (
            <Card key={stat.label} className="card-medical">
              <CardContent className="p-4 text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Medical Information */}
        <Card className="card-medical">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Informations médicales</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">Allergies connues</p>
                <p className="text-sm text-muted-foreground">Pénicilline, Aspirine</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-foreground">Traitements en cours</p>
                <p className="text-sm text-muted-foreground">Aucun traitement en cours</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-foreground">Médecin traitant</p>
                <p className="text-sm text-muted-foreground">Dr. Martin Leroy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Card key={index} className="card-medical cursor-pointer hover:shadow-medium transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">›</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contact */}
        <Card className="card-medical border-destructive/20">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2 text-foreground">Contact d'urgence</h2>
            <p className="text-sm text-muted-foreground mb-4">
              En cas d'urgence médicale, contactez le SAMU
            </p>
            <MedicalButton variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/5">
              Appeler le 15 (SAMU)
            </MedicalButton>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="card-medical">
          <CardContent className="p-4">
            <MedicalButton 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:bg-destructive/5"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Se déconnecter
            </MedicalButton>
          </CardContent>
        </Card>

        {/* Bottom Padding for Navigation */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Profile;