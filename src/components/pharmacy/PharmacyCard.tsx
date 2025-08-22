import { MapPin, Clock, Phone, Star, Heart } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import pharmacyIcon from "@/assets/pharmacy-icon.jpg";

interface PharmacyCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  openUntil?: string;
  phone: string;
  hasPromo?: boolean;
  promoText?: string;
}

const PharmacyCard = ({
  name,
  address,
  distance,
  rating,
  isOpen,
  openUntil,
  phone,
  hasPromo,
  promoText,
}: PharmacyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="card-pharmacy relative overflow-hidden">
      <CardContent className="p-4">
        {/* Promo Badge */}
        {hasPromo && (
          <Badge className="absolute top-2 right-2 bg-warning text-warning-foreground">
            {promoText}
          </Badge>
        )}

        <div className="flex items-start space-x-3">
          {/* Pharmacy Icon */}
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <img 
              src={pharmacyIcon} 
              alt="Pharmacy" 
              className="w-8 h-8 object-cover rounded"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground truncate">{name}</h3>
                <div className="flex items-center space-x-1 mt-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground truncate">{address}</span>
                </div>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-sm font-medium text-primary">{distance}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-warning fill-warning" />
                    <span className="text-sm text-muted-foreground">{rating}</span>
                  </div>
                </div>
              </div>

              {/* Favorite Button */}
              <MedicalButton
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="h-8 w-8"
              >
                <Heart 
                  className={`h-4 w-4 ${isFavorite ? "fill-destructive text-destructive" : ""}`} 
                />
              </MedicalButton>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className={`text-xs font-medium ${isOpen ? "text-success" : "text-destructive"}`}>
                    {isOpen ? `Ouverte${openUntil ? ` jusqu'à ${openUntil}` : ""}` : "Fermée"}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <MedicalButton variant="ghost" size="sm">
                  <Phone className="h-3 w-3 mr-1" />
                  Appeler
                </MedicalButton>
                <MedicalButton variant="primary" size="sm">
                  Voir
                </MedicalButton>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmacyCard;