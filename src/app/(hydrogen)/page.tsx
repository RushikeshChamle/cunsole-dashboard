

// import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';
import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Cunsole'),
};

export default function eCommerceDashboardPage() {
  return <EcommerceDashboard />;
}

