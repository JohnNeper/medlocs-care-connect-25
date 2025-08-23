import React, { useState, useEffect } from 'react';
import { Bell, BellOff, CheckCircle2, Clock, Pill } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  nextDose: string;
  frequency: string;
  taken: boolean;
  progress: number;
  daysRemaining: number;
}

interface MedicationReminderProps {
  medication: Medication;
  onTaken: (id: string) => void;
  onSnooze: (id: string, minutes: number) => void;
}

const MedicationReminder: React.FC<MedicationReminderProps> = ({
  medication,
  onTaken,
  onSnooze
}) => {
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const nextDoseTime = new Date();
      const [hours, minutes] = medication.nextDose.split(':').map(Number);
      nextDoseTime.setHours(hours, minutes, 0, 0);
      
      if (nextDoseTime < now) {
        nextDoseTime.setDate(nextDoseTime.getDate() + 1);
      }
      
      const diffMs = nextDoseTime.getTime() - now.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      
      if (diffMins <= 0) {
        setIsOverdue(true);
        setTimeUntilNext('En retard');
      } else if (diffMins < 60) {
        setTimeUntilNext(`${diffMins} min`);
        setIsOverdue(diffMins <= 5);
      } else {
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        setTimeUntilNext(`${hours}h${mins > 0 ? ` ${mins}min` : ''}`);
        setIsOverdue(false);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [medication.nextDose]);

  const handleTaken = () => {
    onTaken(medication.id);
    toast({
      title: "Prise confirmée",
      description: `${medication.name} marqué comme pris`,
    });
  };

  const handleSnooze = (minutes: number) => {
    onSnooze(medication.id, minutes);
    toast({
      title: "Rappel reporté",
      description: `Nouveau rappel dans ${minutes} minutes`,
    });
  };

  return (
    <Card className={`transition-all duration-200 ${
      isOverdue ? 'ring-2 ring-destructive/50 bg-destructive/5' : 
      timeUntilNext.includes('min') && !timeUntilNext.includes('h') ? 'ring-2 ring-warning/50 bg-warning/5' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            medication.taken ? 'bg-success/20 text-success' :
            isOverdue ? 'bg-destructive/20 text-destructive animate-pulse' :
            timeUntilNext.includes('min') && !timeUntilNext.includes('h') ? 'bg-warning/20 text-warning animate-pulse' :
            'bg-primary/20 text-primary'
          }`}>
            {medication.taken ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <Pill className="h-6 w-6" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{medication.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {medication.dosage} • {medication.frequency}
                </p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{medication.nextDose}</span>
                </div>
                <Badge 
                  variant={
                    medication.taken ? "secondary" :
                    isOverdue ? "destructive" :
                    timeUntilNext.includes('min') && !timeUntilNext.includes('h') ? "secondary" :
                    "outline"
                  }
                  className={
                    medication.taken ? "bg-success/10 text-success" :
                    isOverdue ? "" :
                    timeUntilNext.includes('min') && !timeUntilNext.includes('h') ? "bg-warning/10 text-warning" :
                    ""
                  }
                >
                  {medication.taken ? 'Pris' : timeUntilNext}
                </Badge>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progression du traitement</span>
                <span>{medication.progress}%</span>
              </div>
              <Progress value={medication.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {medication.daysRemaining} jour{medication.daysRemaining > 1 ? 's' : ''} restant{medication.daysRemaining > 1 ? 's' : ''}
              </p>
            </div>

            {/* Actions */}
            {!medication.taken && (
              <div className="flex space-x-2">
                {isOverdue || (timeUntilNext.includes('min') && !timeUntilNext.includes('h')) ? (
                  <>
                    <MedicalButton 
                      variant="primary" 
                      size="sm"
                      onClick={handleTaken}
                      className="flex-1"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Prise effectuée
                    </MedicalButton>
                    <MedicalButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSnooze(15)}
                    >
                      <Bell className="h-4 w-4 mr-1" />
                      +15min
                    </MedicalButton>
                  </>
                ) : (
                  <div className="flex space-x-2 w-full">
                    <MedicalButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSnooze(15)}
                      className="flex-1"
                    >
                      <Bell className="h-4 w-4 mr-1" />
                      Rappel 15min avant
                    </MedicalButton>
                    <MedicalButton 
                      variant="primary" 
                      size="sm"
                      onClick={handleTaken}
                      className="flex-1"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Marquer pris
                    </MedicalButton>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationReminder;