'use client';

import { useRouter } from 'next/navigation';


import OrderPageHeader from '@/app/shared/Components/customersdetails/OrderPageHeader';
import OrderTabs from '@/app/shared/Components/customersdetails/OrderTabs';

export default function OrderDetailsPage({ params }: any) {
  return (


    <>
      <OrderPageHeader params={params} />
      <OrderTabs params={params} />
    </>
  );
}
