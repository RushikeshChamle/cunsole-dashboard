'use client';
import { Tab } from 'rizzui';
import Overviewtab from '@/app/shared/Components/customersdetails/overviewtab';
import { CartProvider } from '@/store/quick-cart/cart.context';
import CustomerInvoices from "@/app/shared/Components/customersdetails/invoicemenu/CustomerInvoices"
import Transactions from "@/app/shared/Components/customersdetails/transactions/transactions"
import ActivityLogs from "@/app/shared/Components/customersdetails/activitylogs/ActivityLogs"
import Details from "@/app/shared/Components/customersdetails/detailsmenu/Details"

export default function OrderTabs({ params }: any ) {

  const customerId = params.id; // Extract the customerId here

  return (
    <Tab>
      <Tab.List>
        <Tab.ListItem>Overview</Tab.ListItem>
        <Tab.ListItem>Invoices</Tab.ListItem>
        <Tab.ListItem>Transactions</Tab.ListItem>
        <Tab.ListItem>Customer details</Tab.ListItem>
        <Tab.ListItem>Activiy Logs</Tab.ListItem>
      </Tab.List>


      <Tab.Panels>
        <Tab.Panel>
          <CartProvider>
            <Overviewtab customerId={customerId}  />
          </CartProvider>
       
        </Tab.Panel>

      
        <Tab.Panel>

        <CustomerInvoices customerId={customerId}/>
      
        </Tab.Panel>


        <Tab.Panel>
      <Transactions customerId={customerId}/>


        </Tab.Panel>

        <Tab.Panel>
          <Details />


        </Tab.Panel>
        <Tab.Panel>
        <ActivityLogs customerId={customerId}/>


        </Tab.Panel>
      </Tab.Panels>
    </Tab>
  );
}
