'use client';
import { Tab } from 'rizzui';
import Overviewtab from '@/app/shared/Components/customersdetails/overviewtab';
import { CartProvider } from '@/store/quick-cart/cart.context';
import CustomerInvoices from "@/app/shared/Components/customersdetails/invoicemenu/CustomerInvoices"
import Transactions from "@/app/shared/Components/customersdetails/transactions/transactions"
import ActivityLogs from "@/app/shared/Components/customersdetails/activitylogs/ActivityLogs"
import Details from "@/app/shared/Components/customersdetails/detailsmenu/Details"

export default function OrderTabs() {
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
            <Overviewtab />
          </CartProvider>
       
        </Tab.Panel>

      
        <Tab.Panel>

        <CustomerInvoices/>
      
        </Tab.Panel>



        <Tab.Panel>
      <Transactions></Transactions>


        </Tab.Panel>

        <Tab.Panel>
          <Details/>


        </Tab.Panel>
        <Tab.Panel>
        <ActivityLogs/>


        </Tab.Panel>
      </Tab.Panels>
    </Tab>
  );
}
