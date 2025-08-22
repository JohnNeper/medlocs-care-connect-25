import { Plus, TrendingUp, ShoppingCart } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import medicationsImage from "@/assets/medications.jpg";

interface MedicationCardProps {
  id: string;
  name: string;
  type: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  isPopular?: boolean;
  isAvailable?: boolean;
  pharmacyCount: number;
}

const MedicationCard = ({
  name,
  type,
  description,
  minPrice,
  maxPrice,
  isPopular,
  isAvailable = true,
  pharmacyCount,
}: MedicationCardProps) => {
  return (
    <Card className="card-medical relative overflow-hidden">
      <CardContent className="p-4">
        {/* Popular Badge */}
        {isPopular && (
          <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
            <TrendingUp className="h-3 w-3 mr-1" />
            Populaire
          </Badge>
        )}

        <div className="flex items-start space-x-3">
          {/* Medication Image */}
          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img 
              src={medicationsImage} 
              alt="Medication" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground truncate">{name}</h3>
                <Badge variant="outline" className="mt-1 text-xs">
                  {type}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {description}
                </p>
              </div>
            </div>

            {/* Price and Availability */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary">
                  {minPrice === maxPrice ? `${minPrice}€` : `${minPrice}€ - ${maxPrice}€`}
                </span>
                <span className="text-xs text-muted-foreground">
                  {pharmacyCount} pharmacie{pharmacyCount > 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex space-x-2">
                <MedicalButton 
                  variant="outline" 
                  size="sm"
                  disabled={!isAvailable}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Ajouter
                </MedicalButton>
                <MedicalButton 
                  variant="primary" 
                  size="sm"
                  disabled={!isAvailable}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Acheter
                </MedicalButton>
              </div>
            </div>

            {!isAvailable && (
              <div className="mt-2 text-xs text-destructive">
                Actuellement indisponible
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationCard;