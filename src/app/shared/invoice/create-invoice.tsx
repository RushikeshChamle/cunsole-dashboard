'use client';

import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@ui/form';
import { Text, Input, Select, Textarea } from 'rizzui';
import { PhoneNumber } from '@ui/phone-input';
import { DatePicker } from '@ui/datepicker';
import { z } from 'zod';

import {
  FormBlockWrapper,
  statusOptions,
  renderOptionDisplayValue,
} from '@/app/shared/invoice/form-utils';
// import { AddInvoiceItems } from '@/app/shared/invoice/add-invoice-items';
import FormFooter from '@components/form-footer';
import { toast } from 'react-hot-toast';
// import {



// Zod schema for invoice form
export const invoiceFormSchema = z.object({
  // Invoice Details
  invoiceNumber: z.string().min(1, 'Invoice Number is required'),
  customId: z.string(),
  externalId: z.string(),
  name: z.string().min(1, 'Invoice name is required'),
  status: z.string().min(1, 'Status is required'),
  issueDate: z.date(),
  dueDate: z.date(),
  
  // From (Sender) Details
  fromName: z.string().min(1, 'From Name is required'),
  fromAddress: z.string().min(1, 'From Address is required'),
  fromPhone: z.string().optional(),
  
  // To (Recipient) Details
  toName: z.string().min(1, 'To Name is required'),
  toAddress: z.string().min(1, 'To Address is required'),
  toPhone: z.string().optional(),
  customerId: z.string(),
  
  // Financial Details
  currency: z.string().min(1, 'Currency is required'),
  currencyCode: z.string().min(1, 'Currency code is required'),
  totalAmount: z.string().min(1, 'Total amount is required'),
  paidAmount: z.string().min(1, 'Paid amount is required'),
  
  // Additional Details
  reference: z.string(),
  createDate: z.date(),
});

export type InvoiceFormInput = z.infer<typeof invoiceFormSchema>;

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
      <span className="font-bold">Invoice successfully {id ? 'updated' : 'created'}</span>
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createInvoice data ->', data);
      setReset({
        invoiceNumber: '',
        customId: '',
        externalId: '',
        name: '',
        status: 'draft',
        issueDate: new Date(),
        dueDate: new Date(),
        fromName: '',
        fromAddress: '',
        fromPhone: '',
        toName: '',
        toAddress: '',
        toPhone: '',
        customerId: '',
        currency: '',
        currencyCode: '',
        totalAmount: '',
        paidAmount: '',
        reference: '',
        createDate: new Date(),
      });
    }, 600);
  };

  return (
    <Form<InvoiceFormInput>
      validationSchema={invoiceFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          ...record,
          invoiceNumber: 'INV-0071',
          createDate: new Date(),
          status: 'draft',
          customId: 'INV-' + Math.floor(100000 + Math.random() * 900000),
          issueDate: new Date(),
        },
      }}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              {/* Invoice Details section */}
              <FormBlockWrapper
                title={'Invoice Details:'}
                description={'Enter the invoice details'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              >
                <Input
                  label="Invoice Number"
                  placeholder="Enter invoice number"
                  {...register('invoiceNumber')}
                  readOnly
                  error={errors.invoiceNumber?.message}
                />
                {/* <Input
                  label="Custom ID"
                  placeholder="Enter custom ID"
                  {...register('customId')}
                  error={errors.customId?.message}
                /> */}
                {/* <Input
                  label="External ID"
                  placeholder="Enter external ID"
                  {...register('externalId')}
                  error={errors.externalId?.message}
                /> */}
                {/* <Input
                  label="Invoice Name"
                  placeholder="Enter invoice name"
                  {...register('name')}
                  error={errors.name?.message}
                /> */}
                {/* <Controller
                  name="status"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    // <Select
                    //   dropdownClassName="!z-10 h-auto"
                    //   inPortal={false}
                    //   options={statusOptions}
                    //   value={value}
                    //   onChange={onChange}
                    //   name={name}
                    //   label="Status"
                    //   error={errors?.status?.message}
                    //   getOptionValue={(option) => option.value}
                    //   getOptionDisplayValue={(option) =>
                    //     renderOptionDisplayValue(option.value as string)
                    //   }
                    //   displayValue={(selected: string) =>
                    //     renderOptionDisplayValue(selected)
                    //   }
                    // />
                  )}
                /> */}
                <div className="[&>.react-datepicker-wrapper]:w-full">
                  <Controller
                    name="issueDate"
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
              </FormBlockWrapper>

              {/* From section */}
              {/* <FormBlockWrapper
                title={'From:'}
                description={'From he who sending this invoice'}
              >
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register('fromName')}
                  error={errors.fromName?.message}
                />
                <Textarea
                  label="Address"
                  placeholder="Enter your address"
                  {...register('fromAddress')}
                  error={errors.fromAddress?.message}
                  textareaClassName="h-20"
                  className="col-span-2"
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
              </FormBlockWrapper> */}

              {/* To section */}
              <FormBlockWrapper
                title={'To:'}
                description={'To he who will receive this invoice'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              >
                <Input
                  label="Name"
                  placeholder="Enter Customer's name"
                  {...register('toName')}
                  error={errors.toName?.message}
                />
                <Textarea
                  label="Address"
                  placeholder="Enter recipient's address"
                  {...register('toAddress')}
                  error={errors.toAddress?.message}
                  textareaClassName="h-20"
                  className="col-span-2"
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
                <Input
                  label="Customer ID"
                  placeholder="Enter customer ID"
                  {...register('customerId')}
                  error={errors.customerId?.message}
                />
             
              </FormBlockWrapper>

              {/* Financial Details section */}
              <FormBlockWrapper
                title={'Financial Details:'}
                description={'Enter the financial details of the invoice'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              >
                {/* <Input
                  label="Currency"
                  placeholder="Enter currency"
                  {...register('currency')}
                  error={errors.currency?.message}
                />
                <Input
                  label="Currency Code"
                  placeholder="Enter currency code"
                  {...register('currencyCode')}
                  error={errors.currencyCode?.message}
                /> */}
                <Input
                  label="Total Amount"
                  type="text"
                  placeholder="Enter total amount"
                  {...register('totalAmount')}
                  error={errors.totalAmount?.message}
                />
                <Input
                  label="Paid Amount"
                  type="text"
                  placeholder="Enter paid amount"
                  {...register('paidAmount')}
                  error={errors.paidAmount?.message}
                />
              </FormBlockWrapper>

              {/* Additional Details section */}
              <FormBlockWrapper
                title={'Additional Details:'}
                description={'Any additional information for the invoice'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              >
                <Input
                  label="Reference"
                  placeholder="Enter reference"
                  {...register('reference')}
                  error={errors.reference?.message}
                />
                <div className="[&>.react-datepicker-wrapper]:w-full">
                  {/* <Controller
                    name="createDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        inputProps={{ label: 'Date Created' }}
                        placeholderText="Select Date"
                        selected={value}
                        onChange={onChange}
                      />
                    )}
                  /> */}
                </div>
              </FormBlockWrapper>
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