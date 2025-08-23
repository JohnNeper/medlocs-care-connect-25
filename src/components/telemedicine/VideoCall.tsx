import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Camera, Settings } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface VideoCallProps {
  pharmacistName: string;
  pharmacistAvatar?: string;
  isActive: boolean;
  onEnd: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({
  pharmacistName,
  pharmacistAvatar,
  isActive,
  onEnd
}) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('good');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const startTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    if (isActive) {
      // Simulate connection
      setTimeout(() => {
        setIsConnected(true);
        startTimeRef.current = new Date();
        toast({
          title: "Appel connecté",
          description: `Vous êtes maintenant en vidéo avec ${pharmacistName}`,
        });
      }, 2000);

      // Start call timer
      const timer = setInterval(() => {
        if (startTimeRef.current) {
          setCallDuration(Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000));
        }
      }, 1000);

      // Get user media (simulation)
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          toast({
            title: "Accès caméra/micro",
            description: "Veuillez autoriser l'accès à votre caméra et microphone",
            variant: "destructive"
          });
        });

      return () => {
        clearInterval(timer);
      };
    }
  }, [isActive, pharmacistName]);

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast({
      title: isVideoEnabled ? "Caméra désactivée" : "Caméra activée",
      description: isVideoEnabled ? "Votre vidéo est maintenant désactivée" : "Votre vidéo est maintenant activée",
    });
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast({
      title: isAudioEnabled ? "Micro désactivé" : "Micro activé", 
      description: isAudioEnabled ? "Votre micro est maintenant désactivé" : "Votre micro est maintenant activé",
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQualityColor = () => {
    switch (connectionQuality) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-warning';
      case 'poor': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-black/50 text-white p-4 flex items-center justify-between absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={pharmacistAvatar} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {pharmacistName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{pharmacistName}</h3>
            <div className="flex items-center space-x-2 text-sm">
              {isConnected ? (
                <>
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span>{formatDuration(callDuration)}</span>
                  <span className={`text-xs ${getQualityColor()}`}>
                    {connectionQuality === 'excellent' && 'Excellente qualité'}
                    {connectionQuality === 'good' && 'Bonne qualité'}
                    {connectionQuality === 'poor' && 'Qualité faible'}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                  <span>Connexion...</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <MedicalButton
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10"
        >
          <Settings className="h-5 w-5" />
        </MedicalButton>
      </div>

      {/* Video Container */}
      <div className="flex-1 relative">
        {/* Remote Video (Pharmacist) */}
        <div className="w-full h-full relative">
          {isConnected ? (
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center text-white">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={pharmacistAvatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {pharmacistName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <p className="text-lg font-medium">{pharmacistName}</p>
                <p className="text-sm opacity-75">Connexion en cours...</p>
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Local Video (User) */}
        <div className="absolute top-20 right-4 w-32 h-24 bg-black rounded-lg overflow-hidden border-2 border-white/20">
          {isVideoEnabled ? (
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <VideoOff className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-black/50 p-6 flex items-center justify-center space-x-6 absolute bottom-0 left-0 right-0">
        <MedicalButton
          variant={isAudioEnabled ? "secondary" : "outline"}
          size="lg"
          className={`rounded-full w-14 h-14 ${!isAudioEnabled ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
          onClick={toggleAudio}
        >
          {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </MedicalButton>

        <MedicalButton
          variant={isVideoEnabled ? "secondary" : "outline"}
          size="lg"
          className={`rounded-full w-14 h-14 ${!isVideoEnabled ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
          onClick={toggleVideo}
        >
          {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
        </MedicalButton>

        <MedicalButton
          variant="outline"
          size="lg"
          className="rounded-full w-16 h-16 bg-destructive text-destructive-foreground hover:bg-destructive/90 border-destructive"
          onClick={() => {
            toast({
              title: "Appel terminé",
              description: `Durée: ${formatDuration(callDuration)}`,
            });
            onEnd();
          }}
        >
          <PhoneOff className="h-6 w-6" />
        </MedicalButton>

        <MedicalButton
          variant="secondary"
          size="lg"
          className="rounded-full w-14 h-14"
        >
          <Camera className="h-6 w-6" />
        </MedicalButton>
      </div>
    </div>
  );
};

export default VideoCall;