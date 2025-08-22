import { Home, Search, MapPin, MessageCircle, Calendar, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t } = useTranslation();
  
  const navItems = [
    { icon: Home, label: t("nav.home"), path: "/home" },
    { icon: Search, label: t("nav.search"), path: "/search" },
    { icon: MapPin, label: t("nav.pharmacies"), path: "/pharmacies" },
    { icon: MessageCircle, label: t("nav.telemedecine"), path: "/telemedecine" },
    { icon: Calendar, label: t("nav.tracking"), path: "/tracking" },
    { icon: User, label: t("nav.profile"), path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t supports-[backdrop-filter]:bg-background/60">
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center space-y-1 transition-all duration-200",
                isActive
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;