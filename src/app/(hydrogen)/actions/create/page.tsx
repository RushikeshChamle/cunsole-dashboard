import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import CreateEmailTrigger from '@/app/shared/Components/actionsmodule/create_triggers';
import { metaObject } from '@/config/site.config';
import { Button } from 'rizzui';


export const metadata = {
  ...metaObject('Create Invoice'),
};

const pageHeader = {
  title: 'Create Triggers',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Triggers',
    },
    {
      name: 'Create',
    },
  ],
};



export default function InvoiceCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Button>Upload</Button>
      </PageHeader>

      <CreateEmailTrigger id="" record={{}}  />
      
    </>
  );
}
