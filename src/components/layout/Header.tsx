import { Search, Bell, User, Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import medlocsLogo from "@/assets/medlocs-logo.png";

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Menu Button - Mobile */}
        <Button variant="ghost" size="icon" className="mr-2 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mr-6 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8">
            <img src={medlocsLogo} alt="MedLocs" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-xl text-gradient-primary hidden sm:block">
            MedLocs
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t("common.placeholder")}
              className={`pl-10 transition-all duration-200 ${
                isSearchFocused ? "shadow-glow" : ""
              }`}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/search?q=${e.currentTarget.value}`);
                }
              }}
            />
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-2 mr-4">
          <Link to="/pricing">
            <Button variant="ghost" size="sm" className="relative">
              {t('nav.pricing')}
              <Badge className="absolute -top-1 -right-1 text-xs px-1 py-0 h-4 bg-green-500">
                New
              </Badge>
            </Button>
          </Link>
          <Link to="/map-search">
            <Button variant="ghost" size="sm">
              {t('nav.map')}
            </Button>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Search Icon - Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => navigate('/search')}>
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <>
              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => {
                  toast({
                    title: t('common.notifications'),
                    description: "Vous n'avez pas de nouvelles notifications"
                  });
                }}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
              </Button>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* Profile */}
              <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/profile')}>
                <User className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                {t("auth.login")}
              </Button>
              <Button onClick={() => navigate('/register')}>
                {t("auth.register")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;