'use client';
import { Tab } from 'rizzui';
import Overviewtab from '@/app/shared/Components/customersdetails/overviewtab';
import { CartProvider } from '@/store/quick-cart/cart.context';
import CustomerInvoices from "@/app/shared/Components/customersdetails/invoicemenu/CustomerInvoices"
import Transactions from "@/app/shared/Components/customersdetails/transactions/transactions"
import ActivityLogs from "@/app/shared/Components/customersdetails/activitylogs/ActivityLogs"
import Details from "@/app/shared/Components/customersdetails/detailsmenu/Details"
import CreditMenu from "@/app/shared/Components/customersdetails/creditMenu/creditMenu"
import { format } from 'date-fns'; // Import format function

interface ActivityLogsProps {
  customerId: string | number; // Adjust the type according to your actual data
}

export default function OrderTabs({ params }: any ) {
  const customerId = params.id; // Extract the customerId from params

  return (
    <Tab>
      <Tab.List>
        {/* Tab items for navigation */}
        <Tab.ListItem>Overview</Tab.ListItem>
        <Tab.ListItem>Invoices</Tab.ListItem>
        <Tab.ListItem>Transactions</Tab.ListItem>
        <Tab.ListItem>Customer details</Tab.ListItem>
        <Tab.ListItem>Credit Analysis</Tab.ListItem>
      </Tab.List>

      <Tab.Panels>
        {/* Panel for Customer Details */}
        <Tab.Panel>
          <CartProvider>
            <Details customerId={customerId}/>
          </CartProvider>
        </Tab.Panel>

        {/* Panel for Customer Invoices */}
        <Tab.Panel>
          <CustomerInvoices customerId={customerId}/>
        </Tab.Panel>

        {/* Panel for Transactions */}
        <Tab.Panel>
          <Transactions customerId={customerId}/>
        </Tab.Panel>

        {/* Panel for Customer Details  */}
        <Tab.Panel>
          <Details customerId={customerId}/>
        </Tab.Panel>

        {/* Panel for Credit Analysis */}
        <Tab.Panel>
          <CreditMenu customerId={customerId}/>
        </Tab.Panel>
      </Tab.Panels>
    </Tab>
  );
}
