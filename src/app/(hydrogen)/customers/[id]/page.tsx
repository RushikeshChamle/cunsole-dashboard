'use client'
import { Button, Tab } from 'rizzui';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import Link from 'next/link';
import OrderView from '@/app/shared/ecommerce/order/order-view';
import { CartProvider } from '@/store/quick-cart/cart.context';
import OrderDetailsPage from '@/app/shared/Components/customersdetails/OrderDetailsPage';




export default function SomeOtherPage({ params }: any) {
  return (
    <div>
  
      <OrderDetailsPage params={params} />
    </div>
  );
}


     
  