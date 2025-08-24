import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MedicalButton } from '@/components/ui/medical-button';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  isOpen: boolean;
  hours: string;
  lat: number;
  lng: number;
  medications: string[];
}

interface GoogleMapProps {
  searchQuery?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ searchQuery }) => {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [apiKey, setApiKey] = useState<string>('');

  // Mock data for pharmacies
  const pharmacies: Pharmacy[] = [
    {
      id: '1',
      name: 'Pharmacie de la République',
      address: '123 Avenue de la République, 75011 Paris',
      phone: '+33 1 43 57 89 23',
      rating: 4.5,
      distance: '0.2 km',
      isOpen: true,
      hours: '8h30 - 19h30',
      lat: 48.8566,
      lng: 2.3522,
      medications: ['Doliprane', 'Aspirine', 'Amoxicilline']
    },
    {
      id: '2',
      name: 'Pharmacie du Marché',
      address: '45 Rue du Marché, 75003 Paris',
      phone: '+33 1 42 71 56 89',
      rating: 4.2,
      distance: '0.5 km',
      isOpen: false,
      hours: '9h00 - 20h00',
      lat: 48.8584,
      lng: 2.3651,
      medications: ['Paracetamol', 'Ibuprofène', 'Cetirizine']
    },
    {
      id: '3',
      name: 'Grande Pharmacie Voltaire',
      address: '78 Boulevard Voltaire, 75011 Paris',
      phone: '+33 1 43 79 42 15',
      rating: 4.8,
      distance: '0.8 km',
      isOpen: true,
      hours: '8h00 - 21h00',
      lat: 48.8555,
      lng: 2.3708,
      medications: ['Omeprazole', 'Simvastatine', 'Levothyrox']
    }
  ];

  useEffect(() => {
    if (!apiKey) {
      // Show input for API key if not provided
      return;
    }

    const loadGoogleMaps = () => {
      if (typeof google !== 'undefined') {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current) return;

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 48.8566, lng: 2.3522 }, // Paris center
        zoom: 14,
        styles: [
          {
            featureType: 'poi.medical',
            elementType: 'labels.icon',
            stylers: [{ color: '#4A9B8E' }]
          }
        ]
      });

      setMap(mapInstance);

      // Add pharmacy markers
      pharmacies.forEach((pharmacy) => {
        const marker = new google.maps.Marker({
          position: { lat: pharmacy.lat, lng: pharmacy.lng },
          map: mapInstance,
          title: pharmacy.name,
          icon: {
            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0QTlCOEUiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHA+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNFY4SDE4QzE5LjEgOCAyMCA4LjkgMjAgMTBWMTJIMjJWMTBDMjIgNy44IDIwLjIgNiAxOCA2SDE0VjRDMTQgMS44IDEyLjIgMCAxMCAwSDhWMkgxMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yIDEwQzIgOC45IDIuOSA4IDQgOEg4VjZINEM0IDYgMCA4IDAgMTBWMjJDMCAyNC4yIDEuOCAyNiA0IDI2SDE4QzIwLjIgMjYgMjIgMjQuMiAyMiAyMlYxNEgyMFYyMkMyMCAyMy4xIDE5LjEgMjQgMTggMjRINEM0IDI0IDIgMjIgMiAyMFYxMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNiAxNkg4VjEySDE2VjE2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=',
            scaledSize: new google.maps.Size(32, 32),
          }
        });

        marker.addListener('click', () => {
          setSelectedPharmacy(pharmacy);
        });
      });

      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            
            new google.maps.Marker({
              position: userLocation,
              map: mapInstance,
              title: 'Votre position',
              icon: {
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMyNTYzRUIiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==',
                scaledSize: new google.maps.Size(20, 20),
              }
            });
          },
          () => {
            toast({
              title: t('map.locationError'),
              description: t('map.locationErrorDesc'),
              variant: 'destructive',
            });
          }
        );
      }
    };

    loadGoogleMaps();
  }, [apiKey]);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
  };

  if (!apiKey) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-muted rounded-lg">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t('map.apiKeyRequired')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('map.apiKeyDescription')}
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t('map.enterApiKey')}
                className="w-full px-3 py-2 border rounded-md"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleApiKeySubmit(e.currentTarget.value);
                  }
                }}
              />
              <MedicalButton
                onClick={() => {
                  const input = document.querySelector('input') as HTMLInputElement;
                  if (input?.value) {
                    handleApiKeySubmit(input.value);
                  }
                }}
                className="w-full"
              >
                {t('map.loadMap')}
              </MedicalButton>
              <p className="text-xs text-muted-foreground">
                <a 
                  href="https://console.cloud.google.com/apis/credentials" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('map.getApiKey')}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[600px] rounded-lg" />
      
      {selectedPharmacy && (
        <Card className="absolute bottom-4 left-4 right-4 card-medical max-w-md">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{selectedPharmacy.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={selectedPharmacy.isOpen ? "default" : "secondary"}>
                    {selectedPharmacy.isOpen ? t('pharmacy.open') : t('pharmacy.closed')}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{selectedPharmacy.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedPharmacy.distance}</span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{selectedPharmacy.hours}</span>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <MedicalButton
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`tel:${selectedPharmacy.phone}`)}
                >
                  <Phone className="h-4 w-4" />
                </MedicalButton>
                <MedicalButton
                  size="sm"
                  onClick={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPharmacy.lat},${selectedPharmacy.lng}`;
                    window.open(url, '_blank');
                  }}
                >
                  <Navigation className="h-4 w-4" />
                </MedicalButton>
              </div>
            </div>
            
            {selectedPharmacy.medications.length > 0 && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm font-medium mb-2">{t('pharmacy.availableMeds')}:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedPharmacy.medications.slice(0, 3).map((med, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {med}
                    </Badge>
                  ))}
                  {selectedPharmacy.medications.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{selectedPharmacy.medications.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoogleMap;