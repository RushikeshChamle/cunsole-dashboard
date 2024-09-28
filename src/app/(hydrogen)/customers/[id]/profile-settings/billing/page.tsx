import { metaObject } from '@/config/site.config';
import BillingSettingsView from '@/app/shared/account-settings/billing-settings';
export const runtime = 'edge';

export const metadata = {
  ...metaObject('Billing'),
};

export default function IntegrationSettingsFormPage() {
  return <BillingSettingsView />;
}
