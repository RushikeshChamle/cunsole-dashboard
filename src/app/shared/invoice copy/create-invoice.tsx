'use client';

import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@ui/form';
import { Text, Input, Select, Textarea } from 'rizzui';
import { PhoneNumber } from '@ui/phone-input';
import { DatePicker } from '@ui/datepicker';
import {
  FormBlockWrapper,
  statusOptions,
  renderOptionDisplayValue,
} from '@/app/shared/invoice/form-utils';
// import { AddInvoiceItems } from '@/app/shared/invoice/add-invoice-items';
import FormFooter from '@components/form-footer';
import { toast } from 'react-hot-toast';
// import {

//   invoiceFormSchema,
// } from '@/validators/create-invoice.schema';

// const invoiceItems = [
//   { item: '', description: '', quantity: 1, price: undefined },
// ];

// export default function CreateInvoice({
//   id,
//   record,
// }: {
//   id?: string;
//   record?: InvoiceFormInput;
// }) {
//   const [reset, setReset] = useState({});
//   const [isLoading, setLoading] = useState(false);

//   const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {
//     toast.success(
//       <Text as="b">Invoice successfully {id ? 'updated' : 'created'}</Text>
//     );
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       console.log('createInvoice data ->', data);
//       setReset({
//         fromName: '',
//         fromAddress: '',
//         fromPhone: '',
//         toName: '',
//         toAddress: '',
//         toPhone: '',
//         shipping: '',
//         discount: '',
//         taxes: '',
//         createDate: new Date(),
//         status: 'draft',
//         items: invoiceItems,
//       });
//     }, 600);
//   };

//   const newItems = record?.items
//     ? record.items.map((item) => ({
//         ...item,
//       }))
//     : invoiceItems;

//   return (
//     <Form<InvoiceFormInput>
//       validationSchema={invoiceFormSchema}
//       resetValues={reset}
//       onSubmit={onSubmit}
//       useFormProps={{
//         defaultValues: {
//           ...record,
//           invoiceNumber: 'INV-0071',
//           createDate: new Date(),
//           // status: 'draft',
//           items: newItems,
//         },
//       }}
//       className="flex flex-grow flex-col @container [&_label]:font-medium"
//     >

      
            
//       {({ register, control, watch, formState: { errors } }) => (
//         <>
//           <div className="flex-grow pb-10">
//             <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
//               <FormBlockWrapper
//                 title={'From:'}
//                 description={'From he who sending this invoice'}
//               >
//                 <Input
//                   label="Name"
//                   placeholder="Enter your name"
//                   {...register('fromName')}
//                   error={errors.fromName?.message}
//                 />
//                 <Controller
//                   name="fromPhone"
//                   control={control}
//                   render={({ field: { value, onChange } }) => (
//                     <PhoneNumber
//                       label="Phone Number"
//                       country="us"
//                       value={value}
//                       onChange={onChange}
//                     />
//                   )}
//                 />
//                 <Textarea
//                   label="Address"
//                   placeholder="Enter your address"
//                   {...register('fromAddress')}
//                   error={errors.fromAddress?.message}
//                   textareaClassName="h-20"
//                   className="col-span-2"
//                 />
//               </FormBlockWrapper>

//               <FormBlockWrapper
//                 title={'To:'}
//                 description={'To he who will receive this invoice'}
//                 className="pt-7 @2xl:pt-9 @3xl:pt-11"
//               >
//                 <Input
//                   label="Name"
//                   placeholder="Enter your name"
//                   {...register('toName')}
//                   error={errors.toName?.message}
//                 />
//                 <Controller
//                   name="toPhone"
//                   control={control}
//                   render={({ field: { value, onChange } }) => (
//                     <PhoneNumber
//                       label="Phone Number"
//                       country="us"
//                       value={value}
//                       onChange={onChange}
//                     />
//                   )}
//                 />
//                 <Textarea
//                   label="Address"
//                   placeholder="Enter your address"
//                   {...register('toAddress')}
//                   error={errors.toAddress?.message}
//                   textareaClassName="h-20"
//                   className="col-span-2"
//                 />
//               </FormBlockWrapper>

//               <FormBlockWrapper
//                 title={'Schedule:'}
//                 description={'To he who will receive this invoice'}
//                 className="pt-7 @2xl:pt-9 @3xl:pt-11"
//               >
//                 <div className="col-span-2 grid grid-cols-1 items-baseline gap-5 @lg:grid-cols-2 @5xl:grid-cols-4">
//                   <Input
//                     label="Invoice Number"
//                     placeholder="Enter invoice number"
//                     {...register('invoiceNumber')}
//                     readOnly
//                     error={errors.invoiceNumber?.message}
//                   />
//                   <div className="[&>.react-datepicker-wrapper]:w-full">
//                     <Controller
//                       name="createDate"
//                       control={control}
//                       render={({ field: { value, onChange } }) => (
//                         <DatePicker
//                           inputProps={{ label: 'Date Create' }}
//                           placeholderText="Select Date"
//                           selected={value}
//                           onChange={onChange}
//                         />
//                       )}
//                     />
//                   </div>
//                   <div className="[&>.react-datepicker-wrapper]:w-full">
//                     <Controller
//                       name="dueDate"
//                       control={control}
//                       render={({ field: { value, onChange } }) => (
//                         <DatePicker
//                           inputProps={{
//                             label: 'Due Date',
//                             error: errors?.dueDate?.message,
//                           }}
//                           placeholderText="Select Date"
//                           selected={value}
//                           onChange={onChange}
//                         />
//                       )}
//                     />
//                   </div>
//                   <Controller
//                     name="status"
//                     control={control}
//                     render={({ field: { name, onChange, value } }) => (
//                       <Select
//                         dropdownClassName="!z-10 h-auto"
//                         inPortal={false}
//                         options={statusOptions}
//                         value={value}
//                         onChange={onChange}
//                         name={name}
//                         label="Status"
//                         error={errors?.status?.message}
//                         getOptionValue={(option) => option.value}
//                         getOptionDisplayValue={(option) =>
//                           renderOptionDisplayValue(option.value as string)
//                         }
//                         displayValue={(selected: string) =>
//                           renderOptionDisplayValue(selected)
//                         }
//                       />
//                     )}
//                   />
//                 </div>
//               </FormBlockWrapper>

//               <AddInvoiceItems
//                 watch={watch}
//                 control={control}
//                 register={register}
//                 errors={errors}
//               />
//             </div>
//           </div>

//           <FormFooter
//             isLoading={isLoading}
//             submitBtnText={id ? 'Update Invoice' : 'Create Invoice'}
//           />
//         </>
//       )}
//     </Form>
//   );
// }


const invoiceItems = [
  { item: '', description: '', quantity: 1, price: undefined },
];

// Update this interface in your schema file
export interface InvoiceFormInput {
  fromName: string;
  fromAddress: string;
  fromPhone?: string;
  toName: string;
  toAddress: string;
  toPhone?: string;
  invoiceNumber: string;
  createDate: Date;
  dueDate: Date;
  status: string;
  shipping: number;
  discount: number;
  taxes: number;
  items: { item: string; description: string; quantity: number; price: number }[];
  customid: string;
  externalid: string;
  issuedate: Date;
  name: string;
  currency: string;
  total_amount: string;
  paid_amount: string;
  customerid: string;
  reference: string;
  currency_code: string;
}

export default function CreateInvoice({
  id,
  record,
}: {
  id?: string;
  record?: InvoiceFormInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {
    toast.success(
      <Text as="b">Invoice successfully {id ? 'updated' : 'created'}</Text>
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createInvoice data ->', data);
      setReset({
        fromName: '',
        fromAddress: '',
        fromPhone: '',
        toName: '',
        toAddress: '',
        toPhone: '',
        shipping: '',
        discount: '',
        taxes: '',
        createDate: new Date(),
        status: 'draft',
        items: invoiceItems,
        customid: '',
        externalid: '',
        issuedate: new Date(),
        name: '',
        currency: '',
        total_amount: '',
        paid_amount: '',
        customerid: '',
        reference: '',
        currency_code: '',
      });
    }, 600);
  };

  const newItems = record?.items
    ? record.items.map((item) => ({
        ...item,
      }))
    : invoiceItems;

  return (
    <Form<InvoiceFormInput>
      // validationSchema={invoiceFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          ...record,
          invoiceNumber: 'INV-0071',
          createDate: new Date(),
          status: 'draft',
          items: newItems,
          customid: 'INV-' + Math.floor(100000 + Math.random() * 900000),
          issuedate: new Date(),
        },
      }}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, control, watch, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              <FormBlockWrapper
                title={'From:'}
                description={'From he who sending this invoice'}
              >
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register('fromName')}
                  error={errors.fromName?.message}
                />
                <Controller
                  name="fromPhone"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <PhoneNumber
                      label="Phone Number"
                      country="us"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Textarea
                  label="Address"
                  placeholder="Enter your address"
                  {...register('fromAddress')}
                  error={errors.fromAddress?.message}
                  textareaClassName="h-20"
                  className="col-span-2"
                />
              </FormBlockWrapper>

              <FormBlockWrapper
                title={'To:'}
                description={'To he who will receive this invoice'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              >
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register('toName')}
                  error={errors.toName?.message}
                />
                <Controller
                  name="toPhone"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <PhoneNumber
                      label="Phone Number"
                      country="us"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Textarea
                  label="Address"
                  placeholder="Enter your address"
                  {...register('toAddress')}
                  error={errors.toAddress?.message}
                  textareaClassName="h-20"
                  className="col-span-2"
                />
              </FormBlockWrapper>

              <FormBlockWrapper
                title={'Invoice Details:'}
                description={'Enter the invoice details'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              >
                <Input
                  label="Custom ID"
                  placeholder="Enter custom ID"
                  {...register('customid')}
                  error={errors.customid?.message}
                />
                <Input
                  label="External ID"
                  placeholder="Enter external ID"
                  {...register('externalid')}
                  error={errors.externalid?.message}
                />
                <div className="[&>.react-datepicker-wrapper]:w-full">
                  <Controller
                    name="issuedate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        inputProps={{ label: 'Issue Date' }}
                        placeholderText="Select Date"
                        selected={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <Input
                  label="Invoice Name"
                  placeholder="Enter invoice name"
                  {...register('name')}
                  error={errors.name?.message}
                />
                <Input
                  label="Currency"
                  placeholder="Enter currency"
                  {...register('currency')}
                  error={errors.currency?.message}
                />
                <Input
                  label="Total Amount"
                  type="number"
                  placeholder="Enter total amount"
                  {...register('total_amount')}
                  error={errors.total_amount?.message}
                />
                <Input
                  label="Paid Amount"
                  type="number"
                  placeholder="Enter paid amount"
                  {...register('paid_amount')}
                  error={errors.paid_amount?.message}
                />
                <Input
                  label="Customer ID"
                  placeholder="Enter customer ID"
                  {...register('customerid')}
                  error={errors.customerid?.message}
                />
                <Input
                  label="Reference"
                  placeholder="Enter reference"
                  {...register('reference')}
                  error={errors.reference?.message}
                />
                <Input
                  label="Currency Code"
                  placeholder="Enter currency code"
                  {...register('currency_code')}
                  error={errors.currency_code?.message}
                />
              </FormBlockWrapper>

              <FormBlockWrapper
                title={'Schedule:'}
                description={'Invoice scheduling details'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              >
                <div className="col-span-2 grid grid-cols-1 items-baseline gap-5 @lg:grid-cols-2 @5xl:grid-cols-4">
                  <Input
                    label="Invoice Number"
                    placeholder="Enter invoice number"
                    {...register('invoiceNumber')}
                    readOnly
                    error={errors.invoiceNumber?.message}
                  />
                  <div className="[&>.react-datepicker-wrapper]:w-full">
                    <Controller
                      name="createDate"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          inputProps={{ label: 'Date Create' }}
                          placeholderText="Select Date"
                          selected={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="[&>.react-datepicker-wrapper]:w-full">
                    <Controller
                      name="dueDate"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          inputProps={{
                            label: 'Due Date',
                            error: errors?.dueDate?.message,
                          }}
                          placeholderText="Select Date"
                          selected={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { name, onChange, value } }) => (
                      <Select
                        dropdownClassName="!z-10 h-auto"
                        inPortal={false}
                        options={statusOptions}
                        value={value}
                        onChange={onChange}
                        name={name}
                        label="Status"
                        error={errors?.status?.message}
                        getOptionValue={(option) => option.value}
                        getOptionDisplayValue={(option) =>
                          renderOptionDisplayValue(option.value as string)
                        }
                        displayValue={(selected: string) =>
                          renderOptionDisplayValue(selected)
                        }
                      />
                    )}
                  />
                </div>
              </FormBlockWrapper>

              {/* <AddInvoiceItems
                watch={watch}
                control={control}
                register={register}
                errors={errors}
              /> */}
            </div>
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={id ? 'Update Invoice' : 'Create Invoice'}
          />
        </>
      )}
    </Form>
  );
}