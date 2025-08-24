import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Crown, Users, Building } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Subscription = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const selectedPlan = location.state?.selectedPlan || 'premium';

  const planIcons = {
    basic: Crown,
    premium: Users,
    enterprise: Building,
  };

  const planDetails = {
    basic: {
      name: t('pricing.basic'),
      price: '9.99',
      color: 'bg-blue-500',
    },
    premium: {
      name: t('pricing.premium'),
      price: '19.99',
      color: 'bg-gradient-primary',
    },
    enterprise: {
      name: t('pricing.enterprise'),
      price: '39.99',
      color: 'bg-purple-500',
    },
  };

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      toast({
        title: t('subscription.loginRequired'),
        description: t('subscription.loginRequiredDesc'),
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate subscription process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: t('subscription.success'),
        description: t('subscription.successDesc'),
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('subscription.errorDesc'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = planIcons[selectedPlan as keyof typeof planIcons];
  const plan = planDetails[selectedPlan as keyof typeof planDetails];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="absolute top-4 left-4">
        <MedicalButton 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/pricing')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </MedicalButton>
      </div>

      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {t('subscription.title')}
            </h1>
            <p className="text-xl text-white/80">
              {t('subscription.subtitle')}
            </p>
          </div>

          <Card className="card-medical mb-8">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 mx-auto ${plan.color} rounded-full flex items-center justify-center mb-4`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {plan.name}
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold text-primary">€{plan.price}</span>
                <span className="text-muted-foreground">/{t('pricing.month')}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="border-t pt-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t('subscription.summary')}
                </h3>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">{plan.name}</span>
                  <span className="font-semibold">€{plan.price}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t">
                  <span className="font-semibold">{t('subscription.total')}</span>
                  <span className="font-bold text-lg text-primary">€{plan.price}</span>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    {t('subscription.loginInfo')}
                  </p>
                </div>
              )}

              <MedicalButton
                onClick={handleSubscribe}
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading 
                  ? t('common.loading') 
                  : isAuthenticated 
                    ? t('subscription.subscribe')
                    : t('subscription.loginAndSubscribe')
                }
              </MedicalButton>

              <p className="text-xs text-muted-foreground text-center">
                {t('subscription.terms')}
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Badge variant="outline" className="text-white border-white/20">
              {t('subscription.securePayment')}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;