import React from 'react';
import InteractiveMap from '@/components/map/InteractiveMap';

const MapSearch = () => {
  return (
    <div className="min-h-screen bg-background pt-6">
      <div className="container mx-auto px-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Carte des pharmacies</h1>
          <p className="text-muted-foreground">
            Trouvez les pharmacies et médicaments près de vous
          </p>
        </div>

        <InteractiveMap 
          onPharmacySelect={(pharmacy) => {
            console.log('Pharmacy selected:', pharmacy);
          }}
        />

        <div className="h-20" />
      </div>
    </div>
  );
};

export default MapSearch;