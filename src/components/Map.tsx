import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Phone } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MapProps {
  pharmacies?: Array<{
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    isOpen: boolean;
    phone: string;
    distance: string;
  }>;
  userLocation?: { lat: number; lng: number };
  onPharmacySelect?: (pharmacyId: string) => void;
}

const Map: React.FC<MapProps> = ({ 
  pharmacies = [], 
  userLocation = { lat: 48.8566, lng: 2.3522 }, // Default to Paris
  onPharmacySelect 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);
  const [mapError, setMapError] = useState(false);

  // Mock pharmacies if none provided
  const mockPharmacies = [
    {
      id: '1',
      name: 'Pharmacie du Centre',
      address: '15 Rue de la République, 75001 Paris',
      lat: 48.8566,
      lng: 2.3522,
      isOpen: true,
      phone: '01 42 36 75 89',
      distance: '0.2 km'
    },
    {
      id: '2',
      name: 'Pharmacie Saint-Michel',
      address: '8 Boulevard Saint-Michel, 75005 Paris',
      lat: 48.8534,
      lng: 2.3434,
      isOpen: true,
      phone: '01 43 25 61 48',
      distance: '0.5 km'
    },
    {
      id: '3',
      name: 'Pharmacie Voltaire',
      address: '32 Avenue Voltaire, 75011 Paris',
      lat: 48.8589,
      lng: 2.3758,
      isOpen: false,
      phone: '01 48 05 92 37',
      distance: '0.8 km'
    }
  ];

  const displayPharmacies = pharmacies.length > 0 ? pharmacies : mockPharmacies;

  // Simple map implementation without external dependencies
  useEffect(() => {
    if (!mapContainer.current) return;

    // For now, we'll show a static map with pharmacy markers
    // In production, you would integrate with Mapbox, Google Maps, or OpenStreetMap
    
    try {
      // This is a simplified version - replace with actual map integration
      const mapElement = mapContainer.current;
      mapElement.innerHTML = `
        <div class="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <p class="text-sm text-gray-600">Carte interactive</p>
              <p class="text-xs text-gray-500">Paris 1er arrondissement</p>
            </div>
          </div>
          
          <!-- Pharmacy markers -->
          <div class="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div class="absolute top-8 right-6 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div class="absolute bottom-6 left-8 w-3 h-3 bg-red-500 rounded-full"></div>
          
          <!-- User location -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        </div>
      `;
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError(true);
    }
  }, [userLocation]);

  const handlePharmacyClick = (pharmacy: any) => {
    setSelectedPharmacy(pharmacy.id);
    onPharmacySelect?.(pharmacy.id);
  };

  const handleCall = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleDirections = (address: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  if (mapError) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Carte temporairement indisponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapContainer} 
          className="w-full h-64 rounded-lg shadow-medium border"
        />
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <MedicalButton
            variant="secondary"
            size="sm"
            className="bg-background/90 backdrop-blur"
            onClick={() => {
              // Center map on user location
              console.log('Center on user location');
            }}
          >
            <Navigation className="h-4 w-4" />
          </MedicalButton>
        </div>
      </div>

      {/* Pharmacy List */}
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">Pharmacies à proximité</h3>
        {displayPharmacies.map((pharmacy) => (
          <Card 
            key={pharmacy.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-medium ${
              selectedPharmacy === pharmacy.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handlePharmacyClick(pharmacy)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{pharmacy.name}</h4>
                    <Badge 
                      variant={pharmacy.isOpen ? "secondary" : "destructive"}
                      className={pharmacy.isOpen ? "bg-success/10 text-success text-xs" : "text-xs"}
                    >
                      {pharmacy.isOpen ? 'Ouvert' : 'Fermé'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{pharmacy.address}</p>
                  <p className="text-xs text-muted-foreground">{pharmacy.distance}</p>
                </div>
                
                <div className="flex space-x-2">
                  <MedicalButton
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleCall(pharmacy.phone, e)}
                  >
                    <Phone className="h-4 w-4" />
                  </MedicalButton>
                  <MedicalButton
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleDirections(pharmacy.address, e)}
                  >
                    <Navigation className="h-4 w-4" />
                  </MedicalButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Map;