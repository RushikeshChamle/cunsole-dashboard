import { metaObject } from '@/config/site.config';
import PersonalInfoView from '@/app/shared/cunsolecomponents/customers-details/personal-info';


export const metadata = {
  ...metaObject('Profile Settings'),
};


export default function ProfileSettingsFormPage() {
  return <PersonalInfoView />;
}
