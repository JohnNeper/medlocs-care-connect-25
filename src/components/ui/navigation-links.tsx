import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { MedicalButton } from '@/components/ui/medical-button';

const NavigationLinks = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const links = [
    { to: '/pricing', label: t('pricing.title'), badge: 'New' },
    { to: '/map-search', label: t('map.searchResults') },
    { to: '/telemedicine', label: t('nav.telemedecine') },
  ];

  return (
    <div className="hidden md:flex items-center space-x-4">
      {links.map((link) => (
        <Link key={link.to} to={link.to}>
          <MedicalButton
            variant={location.pathname === link.to ? 'primary' : 'ghost'}
            size="sm"
            className="relative"
          >
            {link.label}
            {link.badge && (
              <Badge className="absolute -top-1 -right-1 text-xs px-1 py-0 h-4">
                {link.badge}
              </Badge>
            )}
          </MedicalButton>
        </Link>
      ))}
    </div>
  );
};

export default NavigationLinks;