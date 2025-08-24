import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Pricing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const plans = [
    {
      id: 'basic',
      name: t('pricing.basic'),
      price: '9.99',
      period: t('pricing.month'),
      features: [
        t('pricing.basicFeatures.1'),
        t('pricing.basicFeatures.2'),
        t('pricing.basicFeatures.3'),
        t('pricing.basicFeatures.4'),
      ],
      popular: false,
    },
    {
      id: 'premium',
      name: t('pricing.premium'),
      price: '19.99',
      period: t('pricing.month'),
      features: [
        t('pricing.premiumFeatures.1'),
        t('pricing.premiumFeatures.2'),
        t('pricing.premiumFeatures.3'),
        t('pricing.premiumFeatures.4'),
        t('pricing.premiumFeatures.5'),
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: t('pricing.enterprise'),
      price: '39.99',
      period: t('pricing.month'),
      features: [
        t('pricing.enterpriseFeatures.1'),
        t('pricing.enterpriseFeatures.2'),
        t('pricing.enterpriseFeatures.3'),
        t('pricing.enterpriseFeatures.4'),
        t('pricing.enterpriseFeatures.5'),
        t('pricing.enterpriseFeatures.6'),
      ],
      popular: false,
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    navigate('/subscription', { state: { selectedPlan: planId } });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="absolute top-4 left-4">
        <MedicalButton 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/')}
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-white/80">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative card-medical transform hover:scale-105 transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                  {t('pricing.popular')}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">€{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <MedicalButton
                  onClick={() => handleSelectPlan(plan.id)}
                  className="w-full"
                  variant={plan.popular ? "primary" : "outline"}
                >
                  {t('pricing.selectPlan')}
                </MedicalButton>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            {t('pricing.description')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;