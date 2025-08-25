import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Percent, Zap, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MedicalButton } from "@/components/ui/medical-button";
import { Card, CardContent } from "@/components/ui/card";

interface PromoSlide {
  id: string;
  titleKey: string;
  descriptionKey: string;
  discount?: string;
  bgColor: string;
  icon: React.ElementType;
  ctaKey: string;
}

const PromotionalCarousel = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: PromoSlide[] = [
    {
      id: "1",
      titleKey: "home.carousel.expressDelivery",
      descriptionKey: "home.carousel.expressDeliveryDesc",
      bgColor: "bg-gradient-primary",
      icon: Zap,
      ctaKey: "home.carousel.orderNow",
    },
    {
      id: "2",
      titleKey: "home.carousel.discount20",
      descriptionKey: "home.carousel.discount20Desc",
      discount: "20%",
      bgColor: "bg-gradient-success",
      icon: Percent,
      ctaKey: "home.carousel.claimOffer",
    },
    {
      id: "3",
      titleKey: "home.carousel.loyaltyProgram",
      descriptionKey: "home.carousel.loyaltyProgramDesc",
      bgColor: "bg-gradient-secondary",
      icon: Gift,
      ctaKey: "home.carousel.learnMore",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <Card 
            key={slide.id} 
            className={`min-w-full ${slide.bgColor} border-0 shadow-medium`}
          >
            <CardContent className="p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <slide.icon className="h-6 w-6" />
                    {slide.discount && (
                      <span className="text-2xl font-bold">-{slide.discount}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{t(slide.titleKey)}</h3>
                  <p className="text-white/90 text-sm mb-4">{t(slide.descriptionKey)}</p>
                  <MedicalButton 
                    variant="ghost" 
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {t(slide.ctaKey)}
                  </MedicalButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Buttons */}
      <MedicalButton
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </MedicalButton>

      <MedicalButton
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </MedicalButton>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionalCarousel;