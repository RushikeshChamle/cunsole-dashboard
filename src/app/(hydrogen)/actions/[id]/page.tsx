

// "use client"
// import { useState, useEffect } from 'react';
// import { useForm, SubmitHandler, Controller } from 'react-hook-form';
// import { Text, Input, Select, Textarea, Button } from 'rizzui';
// import { toast } from 'react-hot-toast';
// import PageHeader from '@/app/shared/page-header';
// import { routes } from '@/config/routes';

// const conditionOptions = [
//   { value: '0', label: 'Before Due Date' },
//   { value: '1', label: 'On Due Date' },
//   { value: '2', label: 'After Due Date' },
// ];

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//   return null;
// }

// export default function CreateEmailTrigger({ id, record }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [reset, setReset] = useState({});
//   const [isLoading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [triggers, setTriggers] = useState([]); // State to store fetched data

//   const { handleSubmit, register, control, formState: { errors } } = useForm({
//     defaultValues: {
//       ...record,
//       condition_type: record?.condition_type || 0,
//       days_offset: record?.days_offset || 1,
//       isactive: record?.isactive ?? true,
//     },
//   });

  
//   return (
//     <div>
//       <PageHeader
//         title="Trigger Detail"
//         breadcrumb={[
//           { href: routes.eCommerce.dashboard, name: 'Home' },
//           { href: routes.invoice.home, name: 'Triggers' },
//           { name: 'View' },
//         ]}
//       />

//       <h1>This Is Rushikesh</h1>



      


//     </div>
//   );
// }


"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';

const conditionOptions = [
  { value: '0', label: 'Before Due Date' },
  { value: '1', label: 'On Due Date' },
  { value: '2', label: 'After Due Date' },
];

// Define types for the props
interface CreateEmailTriggerProps {
  id: string; // or a more specific type
  record: {
    condition_type?: number;
    days_offset?: number;
    isactive?: boolean;
    // Add other fields that are part of the record object
  };
}



export default function CreateEmailTrigger({ id, record }: CreateEmailTriggerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [triggers, setTriggers] = useState([]); // State to store fetched data

  const { handleSubmit, register, control, formState: { errors } } = useForm({
    defaultValues: {
      ...record,
      condition_type: record?.condition_type || 0,
      days_offset: record?.days_offset || 1,
      isactive: record?.isactive ?? true,
    },
  });

  return (
    <div>
      <PageHeader
        title="Trigger Detail"
        breadcrumb={[
          { href: routes.eCommerce.dashboard, name: 'Home' },
          { href: routes.invoice.home, name: 'Triggers' },
          { name: 'View' },
        ]}
      />

      <h1>This Is Rushikesh</h1>
    </div>
  );
}
