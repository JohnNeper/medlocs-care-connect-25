import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Menu Button - Mobile */}
        <Button variant="ghost" size="icon" className="mr-2 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mr-6 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
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
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
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