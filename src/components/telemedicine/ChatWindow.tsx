import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: 'user' | 'pharmacist';
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'audio';
}

interface ChatWindowProps {
  pharmacistName: string;
  pharmacistAvatar?: string;
  isActive: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  pharmacistName,
  pharmacistAvatar,
  isActive,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'pharmacist',
      content: `Bonjour ! Je suis ${pharmacistName}. Comment puis-je vous aider aujourd'hui ?`,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate pharmacist response
    setTimeout(() => {
      const responses = [
        "Je comprends votre préoccupation. Pouvez-vous me donner plus de détails ?",
        "C'est une excellente question. Laissez-moi vous expliquer...",
        "Pour ce type de symptôme, je recommande généralement...",
        "Avez-vous déjà pris ce médicament auparavant ?",
        "Je vais vous donner quelques conseils personnalisés."
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'pharmacist',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, response]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Enregistrement audio",
        description: "Fonctionnalité bientôt disponible",
      });
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={pharmacistAvatar} />
            <AvatarFallback className="bg-primary-foreground text-primary">
              {pharmacistName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{pharmacistName}</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm opacity-90">En ligne</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <MedicalButton
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Phone className="h-5 w-5" />
          </MedicalButton>
          <MedicalButton
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={onClose}
          >
            <PhoneOff className="h-5 w-5" />
          </MedicalButton>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : ''}`}>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 px-2">
                {formatTime(message.timestamp)}
              </p>
            </div>
            
            {message.sender === 'pharmacist' && (
              <Avatar className="w-8 h-8 order-1 mr-2">
                <AvatarImage src={pharmacistAvatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {pharmacistName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-warning/10 border-warning/20 border p-2 mx-4">
          <p className="text-sm text-warning text-center">
            Reconnexion en cours...
          </p>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <MedicalButton
                variant="ghost"
                size="sm"
                onClick={handleFileUpload}
              >
                <Paperclip className="h-4 w-4" />
              </MedicalButton>
              <MedicalButton
                variant="ghost"
                size="sm"
                onClick={toggleRecording}
                className={isRecording ? 'text-destructive' : ''}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </MedicalButton>
            </div>
            
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              className="resize-none"
            />
          </div>
          
          <MedicalButton
            variant="primary"
            size="sm"
            onClick={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </MedicalButton>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            toast({
              title: "Envoi de fichier",
              description: "Fonctionnalité bientôt disponible",
            });
          }
        }}
      />
    </div>
  );
};

export default ChatWindow;