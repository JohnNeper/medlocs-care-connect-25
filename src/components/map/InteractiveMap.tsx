import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Search, MapPin, Navigation, Phone, Filter, Star } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import pharmacyModern from '@/assets/pharmacy-modern.jpg';
import pharmacyTraditional from '@/assets/pharmacy-traditional.jpg';
import pharmacyDigital from '@/assets/pharmacy-digital.jpg';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  isOpen: boolean;
  phone: string;
  distance: string;
  rating: number;
  image: string;
  services: string[];
  medications: string[];
}

interface InteractiveMapProps {
  onPharmacySelect?: (pharmacy: Pharmacy) => void;
  searchQuery?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onPharmacySelect,
  searchQuery = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [filteredPharmacies, setFilteredPharmacies] = useState<Pharmacy[]>([]);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('');

  const pharmacies: Pharmacy[] = [
    {
      id: '1',
      name: 'Pharmacie Moderne du Centre',
      address: '15 Rue de la République, 75001 Paris',
      lat: 48.8566,
      lng: 2.3522,
      isOpen: true,
      phone: '01 42 36 75 89',
      distance: '0.2 km',
      rating: 4.8,
      image: pharmacyModern,
      services: ['Consultation', 'Vaccination', 'Tests COVID'],
      medications: ['Doliprane', 'Aspirine', 'Ibuprofène', 'Amoxicilline']
    },
    {
      id: '2',
      name: 'Pharmacie Traditionnelle Saint-Michel',
      address: '8 Boulevard Saint-Michel, 75005 Paris',
      lat: 48.8534,
      lng: 2.3434,
      isOpen: true,
      phone: '01 43 25 61 48',
      distance: '0.5 km',
      rating: 4.6,
      image: pharmacyTraditional,
      services: ['Préparations magistrales', 'Orthopédie', 'Homéopathie'],
      medications: ['Spasfon', 'Humex', 'Toplexil', 'Citrate de Bétaïne']
    },
    {
      id: '3',
      name: 'Pharmacie Digitale Voltaire',
      address: '32 Avenue Voltaire, 75011 Paris',
      lat: 48.8589,
      lng: 2.3758,
      isOpen: false,
      phone: '01 48 05 92 37',
      distance: '0.8 km',
      rating: 4.9,
      image: pharmacyDigital,
      services: ['Robot distributeur', 'Téléconseil', 'Livraison'],
      medications: ['Effervescent C', 'Magnésium', 'Probiotiques', 'Vitamines D3']
    }
  ];

  useEffect(() => {
    const filtered = pharmacies.filter(pharmacy =>
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.medications.some(med => 
        med.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredPharmacies(filtered);
  }, [searchTerm]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Check if we have a Mapbox token
    if (!mapboxToken) {
      setShowTokenInput(true);
      return;
    }

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [2.3522, 48.8566], // Paris center
        zoom: 14
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add pharmacy markers
      filteredPharmacies.forEach(pharmacy => {
        const el = document.createElement('div');
        el.className = 'pharmacy-marker';
        el.style.cssText = `
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: ${pharmacy.isOpen ? '#10b981' : '#ef4444'};
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        `;
        
        const icon = document.createElement('div');
        icon.innerHTML = '⚕️';
        icon.style.fontSize = '14px';
        el.appendChild(icon);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([pharmacy.lng, pharmacy.lat])
          .addTo(map.current!);

        el.addEventListener('click', () => {
          setSelectedPharmacy(pharmacy);
          onPharmacySelect?.(pharmacy);
        });
      });

      // Add user location marker
      const userEl = document.createElement('div');
      userEl.style.cssText = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #3b82f6;
        border: 3px solid white;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        animation: pulse 2s infinite;
      `;

      new mapboxgl.Marker(userEl)
        .setLngLat([2.3522, 48.8566])
        .addTo(map.current!);

    } catch (error) {
      console.error('Mapbox initialization error:', error);
      toast({
        title: "Erreur de carte",
        description: "Vérifiez votre token Mapbox",
        variant: "destructive"
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, filteredPharmacies, onPharmacySelect]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePharmacyClick = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    onPharmacySelect?.(pharmacy);
    
    if (map.current) {
      map.current.flyTo({
        center: [pharmacy.lng, pharmacy.lat],
        zoom: 16
      });
    }
  };

  const handleCall = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleDirections = (pharmacy: Pharmacy, e: React.MouseEvent) => {
    e.stopPropagation();
    const encodedAddress = encodeURIComponent(pharmacy.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  if (showTokenInput && !mapboxToken) {
    return (
      <div className="space-y-4">
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-6 text-center">
            <MapPin className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Configuration de la carte</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Pour utiliser la carte interactive, veuillez entrer votre token Mapbox public.
              Obtenez-le gratuitement sur{' '}
              <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                mapbox.com
              </a>
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Entrez votre token Mapbox..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <MedicalButton
                variant="primary"
                onClick={() => {
                  if (mapboxToken.trim()) {
                    setShowTokenInput(false);
                    toast({
                      title: "Token configuré",
                      description: "Initialisation de la carte...",
                    });
                  }
                }}
                disabled={!mapboxToken.trim()}
              >
                Valider
              </MedicalButton>
            </div>
          </CardContent>
        </Card>
        
        {/* Fallback pharmacy list */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Pharmacies disponibles</h3>
          {pharmacies.map((pharmacy) => (
            <Card 
              key={pharmacy.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-medium"
              onClick={() => handlePharmacyClick(pharmacy)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={pharmacy.image} 
                    alt={pharmacy.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
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
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-warning fill-warning" />
                        <span className="text-sm font-medium">{pharmacy.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{pharmacy.distance}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher pharmacies ou médicaments..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <MedicalButton variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </MedicalButton>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapContainer} 
          className="w-full h-96 rounded-lg shadow-medium border"
        />
        
        {selectedPharmacy && (
          <Card className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <img 
                  src={selectedPharmacy.image} 
                  alt={selectedPharmacy.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{selectedPharmacy.name}</h4>
                    <Badge 
                      variant={selectedPharmacy.isOpen ? "secondary" : "destructive"}
                      className={selectedPharmacy.isOpen ? "bg-success/10 text-success text-xs" : "text-xs"}
                    >
                      {selectedPharmacy.isOpen ? 'Ouvert' : 'Fermé'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{selectedPharmacy.address}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-warning fill-warning" />
                        <span className="text-sm font-medium">{selectedPharmacy.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{selectedPharmacy.distance}</span>
                    </div>
                    <div className="flex space-x-2">
                      <MedicalButton
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleCall(selectedPharmacy.phone, e)}
                      >
                        <Phone className="h-4 w-4" />
                      </MedicalButton>
                      <MedicalButton
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDirections(selectedPharmacy, e)}
                      >
                        <Navigation className="h-4 w-4" />
                      </MedicalButton>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results List */}
      {searchTerm && (
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">
            Résultats pour "{searchTerm}" ({filteredPharmacies.length})
          </h3>
          {filteredPharmacies.map((pharmacy) => (
            <Card 
              key={pharmacy.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-medium ${
                selectedPharmacy?.id === pharmacy.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handlePharmacyClick(pharmacy)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={pharmacy.image} 
                    alt={pharmacy.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
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
                    <div className="flex flex-wrap gap-1 mb-2">
                      {pharmacy.medications.slice(0, 3).map((med, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {med}
                        </Badge>
                      ))}
                      {pharmacy.medications.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{pharmacy.medications.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-warning fill-warning" />
                        <span className="text-sm font-medium">{pharmacy.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{pharmacy.distance}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;