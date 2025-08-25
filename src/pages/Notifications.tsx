import { Bell, CheckCircle, Clock, AlertTriangle, MessageCircle, Package, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MedicalButton } from "@/components/ui/medical-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();

  const notifications = [
    {
      id: "1",
      type: "medication",
      icon: Heart,
      title: "Rappel de prise de médicament",
      message: "Il est temps de prendre votre Doliprane 1000mg",
      time: "Il y a 5 min",
      isRead: false,
      priority: "high",
    },
    {
      id: "2",
      type: "order",
      icon: Package,
      title: "Commande prête en pharmacie",
      message: "Votre commande #12345 est disponible à la Pharmacie Martin",
      time: "Il y a 1h",
      isRead: false,
      priority: "medium",
    },
    {
      id: "3",
      type: "consultation",
      icon: MessageCircle,
      title: "Nouvelle consultation disponible",
      message: "Dr. Sophie Martin a répondu à votre demande",
      time: "Il y a 2h",
      isRead: true,
      priority: "medium",
    },
    {
      id: "4",
      type: "reminder",
      icon: Clock,
      title: "Rendez-vous rappel",
      message: "Consultation télépharmacienne demain à 14h30",
      time: "Il y a 1 jour",
      isRead: true,
      priority: "low",
    },
    {
      id: "5",
      type: "alert",
      icon: AlertTriangle,
      title: "Interaction médicamenteuse détectée",
      message: "Attention: possible interaction entre vos médicaments",
      time: "Il y a 2 jours",
      isRead: true,
      priority: "high",
    },
  ];

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === "high" ? "text-destructive" : priority === "medium" ? "text-warning" : "text-muted-foreground";
    
    switch (type) {
      case "medication":
        return <Heart className={`h-5 w-5 ${iconClass}`} />;
      case "order":
        return <Package className={`h-5 w-5 ${iconClass}`} />;
      case "consultation":
        return <MessageCircle className={`h-5 w-5 ${iconClass}`} />;
      case "reminder":
        return <Clock className={`h-5 w-5 ${iconClass}`} />;
      case "alert":
        return <AlertTriangle className={`h-5 w-5 ${iconClass}`} />;
      default:
        return <Bell className={`h-5 w-5 ${iconClass}`} />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-destructive text-destructive-foreground">Urgent</Badge>;
      case "medium":
        return <Badge className="bg-warning text-warning-foreground">Important</Badge>;
      default:
        return null;
    }
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  return (
    <div className="min-h-screen bg-background pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground flex items-center">
              <Bell className="h-6 w-6 mr-2" />
              {t('notifications.title', 'Notifications')}
            </h1>
            <p className="text-muted-foreground">
              {t('notifications.subtitle', 'Restez informé de vos soins de santé')}
            </p>
          </div>
          <MedicalButton variant="outline" size="sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            {t('notifications.markAllRead', 'Tout marquer lu')}
          </MedicalButton>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="card-medical">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{unreadNotifications.length}</div>
              <div className="text-sm text-muted-foreground">Non lues</div>
            </CardContent>
          </Card>
          <Card className="card-medical">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{notifications.filter(n => n.priority === 'high').length}</div>
              <div className="text-sm text-muted-foreground">Urgentes</div>
            </CardContent>
          </Card>
          <Card className="card-medical">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{notifications.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Tabs */}
        <Tabs defaultValue="unread" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unread" className="relative">
              Non lues
              {unreadNotifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 text-xs px-1 py-0 h-4 min-w-4 bg-destructive text-destructive-foreground">
                  {unreadNotifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="all">Toutes</TabsTrigger>
          </TabsList>

          <TabsContent value="unread" className="space-y-4 mt-6">
            {unreadNotifications.length === 0 ? (
              <Card className="card-medical">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Aucune notification non lue</h3>
                  <p className="text-muted-foreground">
                    Toutes vos notifications ont été lues
                  </p>
                </CardContent>
              </Card>
            ) : (
              unreadNotifications.map((notification) => (
                <Card key={notification.id} className={`card-medical cursor-pointer hover:shadow-medium transition-all duration-200 ${!notification.isRead ? 'border-primary/30 bg-primary/5' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {getNotificationIcon(notification.type, notification.priority)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-foreground truncate">{notification.title}</h3>
                              {getPriorityBadge(notification.priority)}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4 mt-6">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`card-medical cursor-pointer hover:shadow-medium transition-all duration-200 ${!notification.isRead ? 'border-primary/30 bg-primary/5' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      {getNotificationIcon(notification.type, notification.priority)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">{notification.title}</h3>
                            {getPriorityBadge(notification.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Bottom Padding for Navigation */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Notifications;