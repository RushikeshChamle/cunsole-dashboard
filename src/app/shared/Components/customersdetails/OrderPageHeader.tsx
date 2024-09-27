'use client';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import Link from 'next/link';
import { Drawer, Text, Input, Textarea } from 'rizzui';
import axiosInstance from '@/axiosInstance'; // Adjust your import for axiosInstance




import ExportButton from '@/app/shared/export-button';
import { metaObject } from '@/config/site.config';
import { useEffect, useState } from 'react';
import { Badge, Table } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import Footer from '@/app/multi-step/footer';


interface Customer {
  id: string;
  externalid: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
  taxid: string;
  companyname: string;
  industrytype: string;
  paymentterms: string;
  creditlimit: string;
  notes: string;
  isactive: boolean;
  created_at: string;
  updated_at: string;
  account: number;
  user: number;
}


export default function OrderPageHeader({ params }: any) {
  const pageHeader = {
    title: `Order #${params.id}`,
    breadcrumb: [
      {
        href: routes.customers.home,
        name: 'Customers',
      },
      {
        href: routes.customers.home,
        name: 'Details',
      },
      {
        name: params.id,
      },
    ],
  };


  const [customerDetails, setCustomerDetails] = useState<Customer | null>(null);
  const [drawerState, setDrawerState] = useState({
    isOpen: false,
    isEditable: false,
  });

  const fetchCustomerDetails = async () => {
    try {
      const response = await axiosInstance.get(`customers/get_customer/${params.id}/`);
      setCustomerDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch customer details:', error);
    }
  };

  const handleEditToggle = () => {
    setDrawerState((prevState) => ({
      ...prevState,
      isEditable: !prevState.isEditable,
    }));
  };

  const handleSaveChanges = async () => {
    // Implement save logic for updating the customer details
    console.log('Saving changes...');
    setDrawerState((prevState) => ({
      ...prevState,
      isEditable: false,
    }));
  };

  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
   
        <Button  
            className="w-full @lg:w-auto"
            onClick={() => {
              fetchCustomerDetails();
              setDrawerState((prevState) => ({
                ...prevState,
                isOpen: true,
              }));
            }}
            
            
            
            >
          Edit Customer
        </Button>


      <Drawer
        isOpen={drawerState.isOpen}
        size="lg"
        onClose={() =>
          setDrawerState((prevState) => ({ ...prevState, isOpen: false }))
        }
      >

        
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto px-5 py-2">
            <h3 className="mb-4 text-xl font-semibold">Customer Details</h3>

            {customerDetails && (
              <div className="space-y-4">
                <Input
                  label="Name"
                  value={customerDetails.name}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      name: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Email"
                  value={customerDetails.email}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      email: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Phone"
                  value={customerDetails.phone}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      phone: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Address"
                  value={customerDetails.address}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      address: e.target.value,
                    }))
                  }
                />
                <Input
                  label="City"
                  value={customerDetails.city}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      city: e.target.value,
                    }))
                  }
                />
                <Input
                  label="State"
                  value={customerDetails.state}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      state: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Country"
                  value={customerDetails.country}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      country: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Postal Code"
                  value={customerDetails.postalcode}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      postalcode: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Tax ID"
                  value={customerDetails.taxid}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      taxid: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Company Name"
                  value={customerDetails.companyname}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      companyname: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Industry Type"
                  value={customerDetails.industrytype}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      industrytype: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Payment Terms"
                  value={customerDetails.paymentterms}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      paymentterms: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Credit Limit"
                  value={customerDetails.creditlimit}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      creditlimit: e.target.value,
                    }))
                  }
                />
                <Textarea
                  label="Notes"
                  value={customerDetails.notes}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setCustomerDetails((prevDetails) => ({
                      ...prevDetails!,
                      notes: e.target.value,
                    }))
                  }
                />
              </div>
            )}
          </div>
  
          <div
            className="mt-2 px-5"
            style={{
              position: 'relative',
              top: 'calc(-14px + 2vh)',
            }}
          >
            <div className="flex justify-end space-x-1">
              {drawerState.isEditable ? (
                <>
                  <Button onClick={handleEditToggle} variant="outline">
                    Cancel
                  </Button>
                  <div className="w-2" />
                  <Button onClick={handleSaveChanges}>Save</Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setDrawerState({
                        isOpen: false,
                        isEditable: false,
                      })
                    }
                  >
                    Close
                  </Button>
                  <div className="w-2" />
                  <Button onClick={handleEditToggle}>Edit</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </PageHeader>
    




    
  );
}
