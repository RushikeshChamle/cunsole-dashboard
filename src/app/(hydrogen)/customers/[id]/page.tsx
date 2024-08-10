'use client'
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import Link from 'next/link';
import OrderView from '@/app/shared/ecommerce/order/order-view';
import { CartProvider } from '@/store/quick-cart/cart.context';
import OrderDetailsPage from '@/app/shared/Components/customersdetails/OrderDetailsPage';
import { Tab } from "rizzui";



export default function SomeOtherPage({ params }: any) {
  return (
    <div>
  
      <OrderDetailsPage params={params} />
    </div>
  );
}




// export default function CustomerDetailsPage({ params }: any) {
//   const pageHeader = {
//     title: `Order #${params.id}`,
//     breadcrumb: [
//       {
//         href: routes.customers,
//         name: 'Customers',
//       },
//       {
//         href: routes.eCommerce.orders,
//         name: 'Orders',
//       },
//       {
//         name: params.id,
//       },
//     ],
//   };


//   return (
//     <>
//       <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
//         <Link
//           href={routes.eCommerce.editOrder(params.id)}
//           className="mt-4 w-full @lg:mt-0 @lg:w-auto"
//         >
//           <Button as="span" className="w-full @lg:w-auto ">
//             Edit Order
//           </Button>
//         </Link>
//       </PageHeader>
//       <Tab>

//       <Tab.List>
//         <Tab.ListItem>Recent</Tab.ListItem>
//         <Tab.ListItem>Popular</Tab.ListItem>
//         <Tab.ListItem>Trending</Tab.ListItem>
//       </Tab.List>

//       <Tab.Panels>
//         <Tab.Panel>

//         <CartProvider>
//       <OrderView />
//       </CartProvider>
          


//         </Tab.Panel>
//         <Tab.Panel>Popular panel</Tab.Panel>
//         <Tab.Panel>Trending panel</Tab.Panel>
//       </Tab.Panels>
//     </Tab>

     
    
    
//     </>
//   );
// }
