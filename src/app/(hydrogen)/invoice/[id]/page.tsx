

"use client"
import { useState, useEffect } from 'react';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';

const getFileType = (url) => {
  const extension = url.split('.').pop().toLowerCase();
  if (['pdf'].includes(extension)) return 'pdf';
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) return 'image';
  return 'unknown';
};



const FileViewer = ({ url }) => {
  const fileType = getFileType(url);

  switch (fileType) {
    case 'pdf':
      return (
        <iframe 
          src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
          width="100%" 
          height="600" 
          className="rounded-lg"
        ></iframe>
      );
    case 'image':
      return (
        <img 
          src={url} 
          alt="File preview" 
          className="max-w-full h-auto rounded-lg"
        />
      );
    default:
      return (
        <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg">
          Unsupported file type
        </div>
      );
  }
};



const pageHeader = {
  title: 'File Details',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Files',
    },
    {
      name: 'Details',
    },
  ],
};

export default function FileDetailsPage() {
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    // Replace this with your actual file URL
    const url = "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf";
    setFileUrl(url);
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button className="w-full @lg:w-auto">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Download
          </Button>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            {fileUrl ? (
              <FileViewer url={fileUrl} />
            ) : (
              <div className="flex items-center justify-center h-[600px]">
                Loading file...
              </div>
            )}
          </div>
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 pb-4 border-b">File Details</h2>
              <div className="space-y-4">
                {[
                  { label: "File Name", value: "Document.pdf" },
                  { label: "File Type", value: "PDF" },
                  { label: "File Size", value: "1.5 MB" },
                  { label: "Upload Date", value: "August 26, 2024" },
                  { label: "Last Modified", value: "August 26, 2024" },
                  { label: "Owner", value: "John Doe" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline">Share</Button>
              <Button>Download</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

