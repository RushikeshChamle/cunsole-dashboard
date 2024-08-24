'use client';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import Link from 'next/link';


export default function OrderPageHeader({ params }: any) {
  const pageHeader = {
    title: `Order #${params.id}`,
    breadcrumb: [
      {
        href: routes.customers,
        name: 'Customers',
      },
      {
        href: routes.eCommerce.orders,
        name: 'Orders',
      },
      {
        name: params.id,
      },
    ],
  };

  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <Link
        href={routes.eCommerce.editOrder(params.id)}
        className="mt-4 w-full @lg:mt-0 @lg:w-auto"
      >
        <Button as="span" className="w-full @lg:w-auto">
          Edit Order
        </Button>
      </Link>
    </PageHeader>
  );
}
