"use client";
import { useState, useEffect } from 'react';
import { PiDownloadSimpleBold, PiPrinterBold, PiEnvelopeBold } from 'react-icons/pi';
import { Button, Tab } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { Dropdown } from "rizzui";

// Utility function to determine the file type from the URL
const getFileType = (url) => {
  // Extract the file extension from the URL
  const extension = url.split('.').pop().toLowerCase();
  
  // Return 'pdf' for PDF files
  if (['pdf'].includes(extension)) return 'pdf';
  
  // Return 'image' for common image file types
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) return 'image';
  
  // Return 'unknown' for unsupported file types
  return 'unknown';
};

// Component to render different types of files based on the file type
const FileViewer = ({ url }) => {
  // Determine the type of file to display
  const fileType = getFileType(url);

  switch (fileType) {
    case 'pdf':
      return (
        // Display PDF file using Google Docs viewer
        <iframe 
          src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
          width="100%" 
          height="100%" 
          className="rounded-lg"
          title="PDF Viewer"
        ></iframe>
      );
    case 'image':
      return (
        // Display image file
        <img 
          src={url} 
          alt="Invoice preview" 
          className="max-w-full h-auto rounded-lg"
        />
      );
    default:
      return (
        // Display a placeholder for unsupported file types
        <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg">
          Unsupported file type
        </div>
      );
  }
};

// Configuration object for the page header, including title and breadcrumb navigation
const pageHeader = {
  title: 'Invoice Details',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Invoices',
    },
    {
      name: 'Details',
    },
  ],
};

// Main component for the Invoice Details page
export default function InvoiceDetailsPage() {
  // State variable to hold the URL of the file to be displayed
  const [fileUrl, setFileUrl] = useState('');
  
  // State variable to hold the details of the invoice
  const [invoiceData, setInvoiceData] = useState({
    invoiceId: 'INV-2024-001',
    customerName: 'Acme Corporation',
    totalAmount: '$5,000.00',
    remainingAmount: '$2,500.00',
    status: 'Partially Paid',
    contactPerson: 'John Doe',
    contactEmail: 'john.doe@acme.com',
    contactPhone: '+1 (555) 123-4567',
    dueDate: 'September 15, 2024',
    issueDate: 'August 26, 2024',
    paymentTerms: 'Net 30',
    poNumber: 'PO-2024-001',
    remarks: 'Please pay the remaining balance by the due date.',
  });

  // Effect hook to set the file URL when the component mounts
  useEffect(() => {
    // Example URL of the PDF file
    const url = "https://cunsolepublic.s3.ap-south-1.amazonaws.com/wordpress-pdf-invoice-plugin-sample.pdf";
    setFileUrl(url); // Set the file URL to display
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          
          {/* Button to email the invoice */}
          <Button variant="outline">
            <PiEnvelopeBold className="me-1.5 h-[17px] w-[17px]" />
            Email Invoice
          </Button>
          
          {/* Dropdown menu for additional actions related to the invoice */}
          <Dropdown>
            <Dropdown.Trigger>
              <Button as="span">
                Actions <PiDownloadSimpleBold className="ml-2 w-5" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Add Remark</Dropdown.Item>
              <Dropdown.Item>Add Payment Entry</Dropdown.Item>
              <Dropdown.Item>Send Email</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
        </div>
      </PageHeader>

      <div className="">
        <Tab>
          
          {/* Tab navigation for different sections of the invoice details */}
          <Tab.List>
            <Tab.ListItem>Overview</Tab.ListItem>
            <Tab.ListItem>Payment</Tab.ListItem>
            <Tab.ListItem>Activity Logs</Tab.ListItem>
          </Tab.List>

          <Tab.Panels>
            {/* Overview panel displaying the invoice file and details */}
            <Tab.Panel>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 bg-white rounded-lg overflow-hidden shadow-lg">
                  {fileUrl ? (
                    <FileViewer url={fileUrl} />
                  ) : (
                    // Display a loading message while the file is being loaded
                    <div className="flex items-center justify-center h-[600px]">
                      Loading invoice...
                    </div>
                  )}
                </div>

                {/* Panel displaying the invoice details */}
                <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 pb-2">Invoice Details</h2>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      invoiceData.status === 'Paid' ? 'bg-green-100 text-green-600' :
                      invoiceData.status === 'Partially Paid' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {invoiceData.status}
                    </span>
                  </div>
                  <div className="space-y-4 mb-4">
                    {/* Map over invoice data to display each detail */}
                    {Object.entries(invoiceData).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0">
                        <span className="text-gray-600 font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                        </span>
                        <span className="text-gray-800 font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab.Panel>
            
            {/* Payment Details panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Payment Details</h2>
                {/* Placeholder for payment details */}
                <p>No payment details available.</p>
              </div>
            </Tab.Panel>
            
            {/* Activity Logs panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Activity Logs</h2>
                {/* Placeholder for activity logs */}
                <p>No activity logs available.</p>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab>
      </div>
    </>
  );
}
