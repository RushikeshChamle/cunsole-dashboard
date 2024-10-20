// 'use client';

// import { useState, useEffect } from 'react';
// import { SubmitHandler, Controller } from 'react-hook-form';
// import { Form } from '@ui/form';
// import { Input, Textarea, Select, Text } from 'rizzui';
// import { PhoneNumber } from '@ui/phone-input';
// import { toast } from 'react-hot-toast';
// import axiosInstance from '@/axiosInstance';
// import FormFooter from '@components/form-footer';
// import { z } from 'zod';
// import { FormBlockWrapper } from '@/app/shared/invoice/form-utils';
// import { DatePicker } from '@ui/datepicker';

// export const invoiceFormSchema = z.object({
//   customid: z.string().min(1, 'Invoice Number is required'),
//   issuedate: z.date(),
//   duedate: z.date(),
//   customerid: z.string().min(1, 'Customer is required'),
//   toAddress: z.string().min(1, 'Customer Address is required'),
//   toPhone: z.string().optional(),
//   total_amount: z.string().min(1, 'Total amount is required'),
//   paid_amount: z.string().optional(),
//   reference: z.string().optional(),
// });

// export type InvoiceFormInput = z.infer<typeof invoiceFormSchema>;

// export default function CreateInvoice({
//   id,
//   record,
// }: {
//   id?: string;
//   record?: InvoiceFormInput;
// }) {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [isLoading, setLoading] = useState(false);
//   const [reset, setReset] = useState({});

//   // Fetch customers from backend API
//   useEffect(() => {
//     axiosInstance
//       .get('/customers/getcustomers/')
//       .then((response) => {
//         const customerOptions = response.data.map((customer) => ({
//           label: customer.name,
//           value: customer.id,
//           company: customer.companyname,
//           phone: customer.phone,
//           address: customer.address,
//         }));
//         setCustomers(customerOptions);
//       })
//       .catch((error) => console.error('Error fetching customers:', error));
//   }, []);

//   const handleCustomerChange = (selected) => {
//     setSelectedCustomer(selected);
//   };

//   const onSubmit: SubmitHandler<InvoiceFormInput> = async (data) => {
//     setLoading(true);
//     try {
//       await axiosInstance.post('/invoices/createinvoices/', data);
//       toast.success(`Invoice ${id ? 'updated' : 'created'} successfully!`);
//       setReset({ ...data, customid: '', total_amount: '', paid_amount: '' });
//     } catch (error) {
//       toast.error('Failed to create invoice.');
//       console.error('Invoice creation error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form<InvoiceFormInput>
//       validationSchema={invoiceFormSchema}
//       resetValues={reset}
//       onSubmit={onSubmit}
//       useFormProps={{
//         defaultValues: {
//           ...record,
//           // customid: 'INV-0071',
//           issuedate: new Date(),
//           duedate: new Date(),
//           toPhone: selectedCustomer?.phone || '',
//           toAddress: selectedCustomer?.address || '',
//         },
//       }}
//       className="flex flex-grow flex-col @container [&_label]:font-medium"
//     >
//       {({ register, control, setValue, formState: { errors } }) => (
//         <>
//           <div className="grid grid-cols-1 gap-8">
//             <FormBlockWrapper title="Invoice Details">
//               <Input
//                 label="Invoice Number"
//                 {...register('customid')}
//                 error={errors.customid?.message}
//               />
//               <Controller
//                 name="issuedate"
//                 control={control}
//                 render={({ field: { value, onChange } }) => (
//                   <DatePicker
//                     inputProps={{ label: 'Issue Date' }}
//                     placeholderText="Select Issue Date"
//                     selected={value}
//                     onChange={onChange}
//                   />
//                 )}
//               />
//               <Controller
//                 name="duedate"
//                 control={control}
//                 render={({ field: { value, onChange } }) => (
//                   <DatePicker
//                     inputProps={{ label: 'Due Date' }}
//                     placeholderText="Select Due Date"
//                     selected={value}
//                     onChange={onChange}
//                   />
//                 )}
//               />
//             </FormBlockWrapper>

//             <FormBlockWrapper title="Recipient Information">
//               <Controller
//                 name="customerid"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     label="Customer Name"
//                     options={customers}
//                     value={customers.find((c) => c.value === field.value) || null}
//                     onChange={(selected) => {
//                       field.onChange(selected?.value);
//                       handleCustomerChange(selected);
//                       setValue('toPhone', selected?.phone || '');
//                       setValue('toAddress', selected?.address || '');
//                     }}
//                     searchable
//                     displayValue={(value) => renderDisplayValue(value)}
//                     getOptionDisplayValue={(option) =>
//                       renderOptionDisplayValue(option)
//                     }
//                     clearable
//                     onClear={() => {
//                       field.onChange('');
//                       setValue('toPhone', '');
//                       setValue('toAddress', '');
//                     }}
//                     error={errors.customerid?.message} // Adjusted from customerId to customerid
//                   />
//                 )}
//               />
//               <Controller
//                 name="toPhone"
//                 control={control}
//                 render={({ field }) => (
//                   <PhoneNumber label="Phone" country="us" {...field} />
//                 )}
//               />
//               <Textarea
//                 label="Customer Address"
//                 {...register('toAddress')}
//                 error={errors.toAddress?.message}
//                 textareaClassName="h-25"
//                 className="col-span-2"
//               />
//             </FormBlockWrapper>

//             <FormBlockWrapper title="Financial Details">
//               <Input
//                 label="Total Amount"
//                 {...register('total_amount')} // Adjusted to total_amount
//                 error={errors.total_amount?.message} // Adjusted from totalAmount to total_amount
//               />
//               {/* <Input
//                 label="Paid Amount"
//                 {...register('paid_amount')} // Adjusted to paid_amount
//                 error={errors.paid_amount?.message} // Adjusted from paidAmount to paid_amount
//               /> */}
//             </FormBlockWrapper>

//             <FormBlockWrapper title="Additional Details">
//               <Input
//                 label="Reference"
//                 {...register('reference')}
//                 error={errors.reference?.message}
//               />
//             </FormBlockWrapper>

//             <FormFooter
//               isLoading={isLoading}
//               submitBtnText={id ? 'Update Invoice' : 'Create Invoice'}
//             />
//           </div>
//         </>
//       )}
//     </Form>
//   );
// }

// function renderDisplayValue(value) {
//   return (
//     <span className="flex items-center gap-2">
//       <Text fontWeight="medium">{value?.label}</Text>
//     </span>
//   );
// }

// function renderOptionDisplayValue(option) {
//   return (
//     <div className="flex items-center gap-3">
//       <div>
//         <Text fontWeight="medium">{option.label}</Text>
//         <Text className="text-sm text-gray-500" style={{ fontSize: '0.875rem' }}>
//           {option.company}
//         </Text>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { SubmitHandler, Controller } from 'react-hook-form';
// import { Form } from '@ui/form';
// import { Input, Textarea, Select, Text } from 'rizzui';
// import { PhoneNumber } from '@ui/phone-input';
// import { toast } from 'react-hot-toast';
// import axiosInstance from '@/axiosInstance';
// import FormFooter from '@components/form-footer';
// import { z } from 'zod';
// import { FormBlockWrapper } from '@/app/shared/invoice/form-utils';
// import { DatePicker } from '@ui/datepicker';

// export const invoiceFormSchema = z.object({
//   customid: z.string().min(1, 'Invoice Number is required'),
//   issuedate: z.date(),
//   duedate: z.date(),
//   customerid: z.string().min(1, 'Customer is required'),
//   toAddress: z.string().min(1, 'Customer Address is required'),
//   toPhone: z.string().optional(),
//   total_amount: z.string().min(1, 'Total amount is required'),
//   paid_amount: z.string().optional(),
//   reference: z.string().optional(),
// });

// export type InvoiceFormInput = z.infer<typeof invoiceFormSchema>;

// type Customer = {
//   value: string;
//   phone: string;
//   address: string;
//   company: string;
//   label: string;
// };

// export default function CreateInvoice({
//   id,
//   record,
// }: {
//   id?: string;
//   record?: InvoiceFormInput;
// }) {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
//   const [isLoading, setLoading] = useState(false);
//   const [reset, setReset] = useState<Partial<InvoiceFormInput>>({});

//   // Fetch customers from backend API
//   useEffect(() => {
//     axiosInstance
//       .get('/customers/getcustomers/')
//       .then((response) => {
//         const customerOptions = response.data.map((customer: any) => ({
//           label: customer.name,
//           value: customer.id,
//           company: customer.companyname,
//           phone: customer.phone,
//           address: customer.address,
//         }));
//         setCustomers(customerOptions);
//       })
//       .catch((error) => console.error('Error fetching customers:', error));
//   }, []);

//   const handleCustomerChange = (selected: Customer | null) => {
//     setSelectedCustomer(selected);
//   };

  
//   const onSubmit: SubmitHandler<InvoiceFormInput> = async (data) => {
//     setLoading(true);
//     try {
//       await axiosInstance.post('/invoices/createinvoices/', data);
//       toast.success(`Invoice ${id ? 'updated' : 'created'} successfully!`);
//       setReset({ ...data, customid: '', total_amount: '', paid_amount: '' });
//     } catch (error) {
//       toast.error('Failed to create invoice.');
//       console.error('Invoice creation error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form<InvoiceFormInput>
//       validationSchema={invoiceFormSchema}
//       resetValues={reset}
//       onSubmit={onSubmit}
//       useFormProps={{
//         defaultValues: {
//           ...record,
//           issuedate: new Date(),
//           duedate: new Date(),
//           toPhone: selectedCustomer?.phone || '',
//           toAddress: selectedCustomer?.address || '',
//         },
//       }}
//       className="flex flex-grow flex-col @container [&_label]:font-medium"
//     >
//       {({ register, control, setValue, formState: { errors } }) => (
//         <>
//           <div className="grid grid-cols-1 gap-8">
//             <FormBlockWrapper title="Invoice Details">
//               <Input
//                 label="Invoice Number"
//                 {...register('customid')}
//                 error={errors.customid?.message}
//               />
//               <Controller
//                 name="issuedate"
//                 control={control}
//                 render={({ field: { value, onChange } }) => (
//                   <DatePicker
//                     inputProps={{ label: 'Issue Date' }}
//                     placeholderText="Select Issue Date"
//                     selected={value}
//                     onChange={onChange}
//                   />
//                 )}
//               />
//               <Controller
//                 name="duedate"
//                 control={control}
//                 render={({ field: { value, onChange } }) => (
//                   <DatePicker
//                     inputProps={{ label: 'Due Date' }}
//                     placeholderText="Select Due Date"
//                     selected={value}
//                     onChange={onChange}
//                   />
//                 )}
//               />
//             </FormBlockWrapper>

//             <FormBlockWrapper title="Recipient Information">
//               <Controller
//                 name="customerid"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     label="Customer Name"
//                     options={customers}
//                     value={customers.find((c) => c.value === field.value) || null}
//                     onChange={(selected) => {
//                       field.onChange(selected?.value);
//                       handleCustomerChange(selected);
//                       setValue('toPhone', selected?.phone || '');
//                       setValue('toAddress', selected?.address || '');
//                     }}
//                     searchable
//                     displayValue={(value) => renderDisplayValue(value)}
//                     getOptionDisplayValue={(option) =>
//                       renderOptionDisplayValue(option)
//                     }
//                     clearable
//                     onClear={() => {
//                       field.onChange('');
//                       setValue('toPhone', '');
//                       setValue('toAddress', '');
//                     }}
//                     error={errors.customerid?.message}
//                   />
//                 )}
//               />
//               <Controller
//                 name="toPhone"
//                 control={control}
//                 render={({ field }) => (
//                   <PhoneNumber label="Phone" country="us" {...field} />
//                 )}
//               />
//               <Textarea
//                 label="Customer Address"
//                 {...register('toAddress')}
//                 error={errors.toAddress?.message}
//                 textareaClassName="h-25"
//                 className="col-span-2"
//               />
//             </FormBlockWrapper>

//             <FormBlockWrapper title="Financial Details">
//               <Input
//                 label="Total Amount"
//                 {...register('total_amount')}
//                 error={errors.total_amount?.message}
//               />
//             </FormBlockWrapper>

//             <FormBlockWrapper title="Additional Details">
//               <Input
//                 label="Reference"
//                 {...register('reference')}
//                 error={errors.reference?.message}
//               />
//             </FormBlockWrapper>

//             <FormFooter
//               isLoading={isLoading}
//               submitBtnText={id ? 'Update Invoice' : 'Create Invoice'}
//             />
//           </div>
//         </>
//       )}
//     </Form>
//   );
// }

// function renderDisplayValue(value: { label: string } | null) {
//   return (
//     <span className="flex items-center gap-2">
//       <Text fontWeight="medium">{value?.label}</Text>
//     </span>
//   );
// }

// function renderOptionDisplayValue(option: { label: string; company: string }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div>
//         <Text fontWeight="medium">{option.label}</Text>
//         <Text className="text-sm text-gray-500" style={{ fontSize: '0.875rem' }}>
//           {option.company}
//         </Text>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@ui/form';
import { Input, Textarea, Select, Text } from 'rizzui';
import { PhoneNumber } from '@ui/phone-input';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/axiosInstance';
import FormFooter from '@components/form-footer';
import { z } from 'zod';
import { FormBlockWrapper } from '@/app/shared/invoice/form-utils';
import { DatePicker } from '@ui/datepicker';

export const invoiceFormSchema = z.object({
  customid: z.string().min(1, 'Invoice Number is required'),
  issuedate: z.date(),
  duedate: z.date(),
  customerid: z.string().min(1, 'Customer is required'),
  toAddress: z.string().min(1, 'Customer Address is required'),
  toPhone: z.string().optional(),
  total_amount: z.string().min(1, 'Total amount is required'),
  paid_amount: z.string().optional(),
  reference: z.string().optional(),
});

export type InvoiceFormInput = z.infer<typeof invoiceFormSchema>;

type Customer = {
  value: string;
  phone: string;
  address: string;
  company: string;
  label: string;
};

export default function CreateInvoice({
  id,
  record,
}: {
  id?: string;
  record?: InvoiceFormInput;
}) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState<Partial<InvoiceFormInput>>({});

  // Fetch customers from backend API
  useEffect(() => {
    axiosInstance
      .get('/customers/getcustomers/')
      .then((response) => {
        const customerOptions = response.data.map((customer: any): Customer => ({
          label: customer.name,
          value: customer.id,
          company: customer.companyname,
          phone: customer.phone,
          address: customer.address,
        }));
        setCustomers(customerOptions);
      })
      .catch((error) => console.error('Error fetching customers:', error));
  }, []);

  const handleCustomerChange = (selected: Customer | null) => {
    setSelectedCustomer(selected);
  };

  const onSubmit: SubmitHandler<InvoiceFormInput> = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.post('/invoices/createinvoices/', data);
      toast.success(`Invoice ${id ? 'updated' : 'created'} successfully!`);
      setReset({ ...data, customid: '', total_amount: '', paid_amount: '' });
    } catch (error) {
      toast.error('Failed to create invoice.');
      console.error('Invoice creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<InvoiceFormInput>
      validationSchema={invoiceFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          ...record,
          issuedate: new Date(),
          duedate: new Date(),
          toPhone: selectedCustomer?.phone || '',
          toAddress: selectedCustomer?.address || '',
        },
      }}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, control, setValue, formState: { errors } }) => (
        <>
          <div className="grid grid-cols-1 gap-8">
            <FormBlockWrapper title="Invoice Details">
              <Input
                label="Invoice Number"
                {...register('customid')}
                error={errors.customid?.message}
              />
              <Controller
                name="issuedate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    inputProps={{ label: 'Issue Date' }}
                    placeholderText="Select Issue Date"
                    selected={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="duedate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    inputProps={{ label: 'Due Date' }}
                    placeholderText="Select Due Date"
                    selected={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormBlockWrapper>

            <FormBlockWrapper title="Recipient Information">
    

<Controller
  name="customerid"
  control={control}
  render={({ field }) => (
    <Select
      label="Customer Name"
      options={customers}
      value={customers.find((c) => c.value === field.value) || null}
      onChange={(selected: Customer | null) => {
        field.onChange(selected?.value || '');
        handleCustomerChange(selected);
        setValue('toPhone', selected?.phone ?? '');
        setValue('toAddress', selected?.address ?? '');
      }}
      searchable
      displayValue={(value: { label: string } | null) => renderDisplayValue(value)} // Updated typing here
      getOptionDisplayValue={(option) => renderOptionDisplayValue(option)}
      clearable
      onClear={() => {
        field.onChange('');
        setValue('toPhone', '');
        setValue('toAddress', '');
      }}
      error={errors.customerid?.message}
    />
  )}
/>

              <Controller
                name="toPhone"
                control={control}
                render={({ field }) => (
                  <PhoneNumber label="Phone" country="us" {...field} />
                )}
              />
              <Textarea
                label="Customer Address"
                {...register('toAddress')}
                error={errors.toAddress?.message}
                textareaClassName="h-25"
                className="col-span-2"
              />
            </FormBlockWrapper>

            <FormBlockWrapper title="Financial Details">
              <Input
                label="Total Amount"
                {...register('total_amount')}
                error={errors.total_amount?.message}
              />
            </FormBlockWrapper>

            <FormBlockWrapper title="Additional Details">
              <Input
                label="Reference"
                {...register('reference')}
                error={errors.reference?.message}
              />
            </FormBlockWrapper>

            <FormFooter
              isLoading={isLoading}
              submitBtnText={id ? 'Update Invoice' : 'Create Invoice'}
            />
          </div>
        </>
      )}
    </Form>
  );
}

function renderDisplayValue(value: { label: string } | null) {
  return (
    <span className="flex items-center gap-2">
      <Text fontWeight="medium">{value?.label}</Text>
    </span>
  );
}

function renderOptionDisplayValue(option: { label: string; company: string }) {
  return (
    <div className="flex items-center gap-3">
      <div>
        <Text fontWeight="medium">{option.label}</Text>
        <Text className="text-sm text-gray-500" style={{ fontSize: '0.875rem' }}>
          {option.company}
        </Text>
      </div>
    </div>
  );
}


