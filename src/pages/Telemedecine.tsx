import { Video, MessageCircle, Phone, Clock, Star, Users, CheckCircle } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ChatWindow from "@/components/telemedicine/ChatWindow";
import VideoCall from "@/components/telemedicine/VideoCall";
import { toast } from "@/hooks/use-toast";

const Telemedecine = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
  const availablePharmacists = [
    {
      id: "1",
      name: "Dr. Sophie Martin",
      specialty: "Pharmacien titulaire",
      rating: 4.9,
      reviews: 127,
      isOnline: true,
      nextAvailable: "Immédiatement",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      consultationPrice: 15,
    },
    {
      id: "2",
      name: "Dr. Pierre Dubois",
      specialty: "Pharmacien spécialisé",
      rating: 4.8,
      reviews: 89,
      isOnline: true,
      nextAvailable: "Dans 5 min",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      consultationPrice: 18,
    },
    {
      id: "3",
      name: "Dr. Marie Leroy",
      specialty: "Pharmacien conseil",
      rating: 4.7,
      reviews: 156,
      isOnline: false,
      nextAvailable: "14h30",
      photo: "https://images.unsplash.com/photo-1594824694996-5ecc2b90806d?w=400&h=400&fit=crop&crop=face",
      consultationPrice: 20,
    },
  ];

  const startChat = (pharmacistId: string, pharmacistName: string) => {
    setActiveChat(pharmacistId);
    toast({
      title: "Chat démarré",
      description: `Connexion avec ${pharmacistName}...`,
    });
  };

  const startVideo = (pharmacistId: string, pharmacistName: string) => {
    setActiveVideo(pharmacistId);
    toast({
      title: "Appel vidéo démarré",
      description: `Connexion vidéo avec ${pharmacistName}...`,
    });
  };

  const endChat = () => {
    setActiveChat(null);
  };

  const endVideo = () => {
    setActiveVideo(null);
  };

  const getActivePharmacist = (id: string | null) => {
    return availablePharmacists.find(p => p.id === id);
  };

  const consultationHistory = [
    {
      id: "1",
      pharmacist: "Dr. Sophie Martin",
      date: "2024-01-15",
      type: "chat",
      duration: "15 min",
      status: "completed",
      reason: "Conseils sur antalgiques",
    },
    {
      id: "2",
      pharmacist: "Dr. Pierre Dubois",
      date: "2024-01-10",
      type: "video",
      duration: "25 min",
      status: "completed",
      reason: "Questions sur ordonnance",
    },
  ];

  const consultationTypes = [
    {
      type: "chat",
      icon: MessageCircle,
      title: "Chat écrit",
      description: "Échangez par messages instantanés",
      price: "À partir de 10€",
      duration: "15-30 min",
    },
    {
      type: "audio",
      icon: Phone,
      title: "Consultation audio",
      description: "Appelez directement le pharmacien",
      price: "À partir de 15€",
      duration: "15-20 min",
    },
    {
      type: "video",
      icon: Video,
      title: "Consultation vidéo",
      description: "Montrez vos symptômes en direct",
      price: "À partir de 20€",
      duration: "20-30 min",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Télépharmacie</h1>
          <p className="text-muted-foreground">
            Consultez un pharmacien depuis chez vous
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {consultationTypes.map((type) => (
            <Card key={type.type} className="card-medical cursor-pointer hover:shadow-medium transition-all duration-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <type.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{type.title}</h3>
                <p className="text-xs text-muted-foreground">{type.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Banner */}
        <Card className="bg-gradient-to-r from-destructive/10 to-warning/10 border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Urgence médicale ?</h3>
                <p className="text-sm text-muted-foreground">Composez le 15 (SAMU) ou le 112</p>
              </div>
              <MedicalButton variant="outline" size="sm" className="border-destructive text-destructive">
                Appeler
              </MedicalButton>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pharmacists" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pharmacists">Pharmaciens disponibles</TabsTrigger>
            <TabsTrigger value="history">Mes consultations</TabsTrigger>
          </TabsList>

          <TabsContent value="pharmacists" className="space-y-4 mt-6">
            {availablePharmacists.map((pharmacist) => (
              <Card key={pharmacist.id} className="card-medical">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={pharmacist.photo} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {pharmacist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-foreground">{pharmacist.name}</h3>
                            {pharmacist.isOnline && (
                              <Badge className="bg-success text-success-foreground text-xs">
                                En ligne
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{pharmacist.specialty}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-warning fill-warning" />
                              <span className="text-sm font-medium">{pharmacist.rating}</span>
                              <span className="text-xs text-muted-foreground">({pharmacist.reviews})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{pharmacist.nextAvailable}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-primary">
                          À partir de {pharmacist.consultationPrice}€
                        </span>
                        <div className="flex space-x-2">
                          <MedicalButton 
                            variant="outline" 
                            size="sm"
                            disabled={!pharmacist.isOnline}
                            onClick={() => startChat(pharmacist.id, pharmacist.name)}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Chat
                          </MedicalButton>
                          <MedicalButton 
                            variant="primary" 
                            size="sm"
                            disabled={!pharmacist.isOnline}
                            onClick={() => startVideo(pharmacist.id, pharmacist.name)}
                          >
                            <Video className="h-4 w-4 mr-1" />
                            Vidéo
                          </MedicalButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-6">
            {consultationHistory.length === 0 ? (
              <Card className="card-medical">
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Aucune consultation</h3>
                  <p className="text-muted-foreground mb-4">
                    Vous n'avez pas encore consulté de pharmacien
                  </p>
                  <MedicalButton variant="primary">
                    Commencer une consultation
                  </MedicalButton>
                </CardContent>
              </Card>
            ) : (
              consultationHistory.map((consultation) => (
                <Card key={consultation.id} className="card-medical">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {consultation.type === 'chat' && <MessageCircle className="h-5 w-5 text-primary" />}
                          {consultation.type === 'video' && <Video className="h-5 w-5 text-primary" />}
                          {consultation.type === 'audio' && <Phone className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{consultation.pharmacist}</h3>
                          <p className="text-sm text-muted-foreground">{consultation.reason}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-xs text-muted-foreground">{consultation.date}</span>
                            <span className="text-xs text-muted-foreground">{consultation.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <Badge className="bg-success text-success-foreground">Terminée</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Bottom Padding for Navigation */}
        <div className="h-20" />
      </div>

      {/* Chat Window */}
      {activeChat && (
        <ChatWindow
          pharmacistName={getActivePharmacist(activeChat)?.name || ""}
          pharmacistAvatar={getActivePharmacist(activeChat)?.photo}
          isActive={!!activeChat}
          onClose={endChat}
        />
      )}

      {/* Video Call */}
      {activeVideo && (
        <VideoCall
          pharmacistName={getActivePharmacist(activeVideo)?.name || ""}
          pharmacistAvatar={getActivePharmacist(activeVideo)?.photo}
          isActive={!!activeVideo}
          onEnd={endVideo}
        />
      )}
    </div>
  );
};

export default Telemedecine;