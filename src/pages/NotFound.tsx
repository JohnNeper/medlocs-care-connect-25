import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-primary-foreground">404</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t('common.pageNotFound')}
          </h1>
          <p className="text-muted-foreground">
            {t('common.pageNotFoundDesc')}
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/home">
              <Home className="h-4 w-4 mr-2" />
              {t('nav.backHome')}
            </Link>
          </Button>
          
          <Button variant="ghost" onClick={() => window.history.back()} className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
