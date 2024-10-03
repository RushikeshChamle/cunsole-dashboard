// import Link from 'next/link';
// import Image from 'next/image';
// import { routes } from '@/config/routes';
// import { Button } from 'rizzui';
// import WelcomeBanner from '@components/banners/welcome';
// import StatCards from '@/app/shared/ecommerce/dashboard/stat-cards';
// import ProfitWidget from '@/app/shared/ecommerce/dashboard/profit-widget';
// import SalesReport from '@/app/shared/ecommerce/dashboard/sales-report';
// import BestSellers from '@/app/shared/ecommerce/dashboard/best-sellers';
// import RepeatCustomerRate from '@/app/shared/ecommerce/dashboard/repeat-customer-rate';
// import UserLocation from '@/app/shared/ecommerce/dashboard/user-location';
// import PromotionalSales from '@/app/shared/ecommerce/dashboard/promotional-sales';
// import RecentOrder from '@/app/shared/ecommerce/dashboard/recent-order';
// import StockReport from '@/app/shared/ecommerce/dashboard/stock-report';
// import { PiPlusBold,PiArrowRightBold,PiArrowBendUpRightDuotone, PiArrowCircleRightDuotone } from 'react-icons/pi';
// import welcomeImg from '@public/shop-illustration.png';
// import imagedashbaord from '@public/imagedashbaord.png';
// import dashbaordsvg from '@public/dashbaordsvg.jpg';
// import icons from '@public/icons.jpg';
// import HandWaveIcon from '@components/icons/hand-wave';
// import BarChartList from "src/app/shared/ecommerce/dashboard/dsoCard.tsx"

// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

// const data = [
//   { month: 'Jan', dso: 45 },
//   { month: 'Feb', dso: 42 },
//   { month: 'Mar', dso: 47 },
//   { month: 'Apr', dso: 44 },
//   { month: 'May', dso: 39 },
//   { month: 'Jun', dso: 41 },
// ]

// export default function EcommerceDashboard() {

  
//   return (
//     <div className="@container">
//       <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">

//       <WelcomeBanner
//   title={ 
//     <>
//       <h2>Good Morning, <br /> Morgan{' '}
//         <HandWaveIcon className="inline-flex h-8 w-8" />
//       </h2>  
//       <br />
//       <div className="mt-2">
//         <h3>9</h3>
//         {/* <div className="text-sm">Actions To do</div>
//          */}

// <h4 className=" ">            
// Actions To do
            
//             </h4>
//         <div className="text-sm text-primary">

//           <h3 className=" text-primary">            
//             INR 2,50,400 Collected in the last 7 days
            
//             </h3>
            
            
//             </div>
//       </div>
//     </>
//   }
//   media={
//     <div className="absolute -bottom-6 end-4 hidden w-[200px] @2xl:block lg:w-[300px] 2xl:-bottom-7 2xl:w-[310px]">
//       <div className="relative">
//         <Image
//           style={{
//             position: "relative",
//             top: "-40px",
//             left: "-2rem",
//             height: "17rem"
//           }}
//           src={imagedashbaord}
//           alt="Welcome shop image from freepik"
//           className="dark:brightness-95 dark:drop-shadow-md"
//         />
//       </div>
//     </div>
//   }
//   contentClassName="@2xl:max-w-[calc(100%-320px)]"
//   className="border border-muted bg-gray-0 pb-6 @4xl:col-span-2 @7xl:col-span-8 lg:pb-7 dark:bg-gray-100/30"
// >
//   <Link href={routes.eCommerce.createProduct} className="inline-flex">
//     {/* <Button as="span" className="h-[34px] shadow md:h-9">
//       Recover Unpaid Invoices  <PiArrowRightBold className="me-1 h-4 w-4" /> 
//     </Button> */}
//     <Button  variant="outline" className="h-[34px] shadow md:h-9">

//       <span>Recover Unpaid Invoices</span>{" "}
//       <PiArrowRightBold
//         strokeWidth="2"
//         className="h-4 w-4 ml-2"
//       />
//     </Button>
//   </Link>
// </WelcomeBanner>



//         <StatCards className="@2xl:grid-cols-4 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8" />
        
// {/* <EnhancedDSOMetrics/> */}
// {/* <BarChartList/> */}
// <BarChartList  className={`w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] 
//   @4xl:col-start-2 @4xl:row-start-3 
//   @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto`} />


//         <ProfitWidget className="h-[464px] @sm:h-[520px] @7xl:col-span-4 @7xl:col-start-9 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-full" />

//         <RepeatCustomerRate className=" @4xl:col-span-1 @7xl:col-span-12 @[90rem]:col-span-8" />
       


//         <SalesReport className="@4xl:col-span-2 @7xl:col-span-8" />
       


//         <PromotionalSales 
//   className={`w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] 
//   @4xl:col-start-2 @4xl:row-start-3 
//   @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto`} 
// />


      
//         {/* <RecentOrder className="relative @4xl:col-span-2 @7xl:col-span-12" /> */}

//         {/* <BestSellers className="@7xl:col-span-6 @[90rem]:col-span-4" />

//         <UserLocation className="@7xl:col-span-6 @[90rem]:col-span-5 @[112rem]:col-span-4" /> */}

//         {/* <StockReport className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-7 @[112rem]:col-span-8" /> */}
//       </div>
//     </div>
//   );
// }



// Corrent Ui repsoensive

// import Link from 'next/link';
// import Image from 'next/image';
// import { routes } from '@/config/routes';
// import { Button } from 'rizzui';
// import WelcomeBanner from '@components/banners/welcome';
// import StatCards from '@/app/shared/ecommerce/dashboard/stat-cards';
// import ProfitWidget from '@/app/shared/ecommerce/dashboard/profit-widget';
// import SalesReport from '@/app/shared/ecommerce/dashboard/sales-report';
// import RepeatCustomerRate from '@/app/shared/ecommerce/dashboard/repeat-customer-rate';
// import PromotionalSales from '@/app/shared/ecommerce/dashboard/promotional-sales';
// import { PiArrowRightBold } from 'react-icons/pi';
// import imagedashbaord from '@public/imagedashbaord.png';
// import HandWaveIcon from '@components/icons/hand-wave';
// import BarChartList from "src/app/shared/ecommerce/dashboard/dsoCard.tsx";



// export default function EcommerceDashboard() {
//   return (
//     <div className="@container">
//       <div className="grid grid-cols-1 gap-4 sm:gap-8">
//         <WelcomeBanner
//           title={ 
//             <>
//               <h2 className="text-2xl font-bold mb-2">Good Morning, <br /> Morgan{' '}
//                 <HandWaveIcon className="inline-flex h-8 w-8" />
//               </h2>  
//               <div className="mt-2">
//                 <h3 className="text-xl font-semibold">9</h3>
//                 <h4 className="text-sm font-medium">Actions To do</h4>
//                 <div className="text-sm text-primary mt-1">
//                   <h3 className="font-medium">            
//                     INR 2,50,400 Collected in the last 7 days
//                   </h3>
//                 </div>
//               </div>
//             </>
//           }
//           media={
//             <div className="absolute -bottom-6 end-4 hidden w-[200px] sm:block lg:w-[300px] xl:-bottom-7 xl:w-[310px]">
//               <div className="relative">
//                 <Image
//                   src={imagedashbaord}
//                   alt="Welcome dashboard image"
//                   className="dark:brightness-95 dark:drop-shadow-md"
//                   style={{
//                     position: "relative",
//                     top: "-40px",
//                     left: "-2rem",
//                     height: "17rem"
//                   }}
//                 />
//               </div>
//             </div>
//           }
//           contentClassName="sm:max-w-[calc(100%-240px)] lg:max-w-[calc(100%-340px)]"
//           className="border border-muted bg-gray-0 pb-6 lg:pb-7 dark:bg-gray-100/30"
//         >
//           <Link href={routes.eCommerce.createProduct} className="inline-flex mt-4 sm:mt-6">
//             <Button variant="outline" className="h-[34px] shadow md:h-9">
//               <span>Recover Unpaid Invoices</span>{" "}
//               <PiArrowRightBold strokeWidth="2" className="h-4 w-4 ml-2" />
//             </Button>
//           </Link>
//         </WelcomeBanner>

//         <StatCards className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" />
        
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
//           <BarChartList className="w-full h-[464px] sm:h-[520px]"/>
//           <PromotionalSales className="w-full" />
          
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

//         <ProfitWidget className="w-full h-[464px] sm:h-[520px]" />
//           <RepeatCustomerRate className="w-full" />
//           </div>

//         <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 sm:gap-8">
        
//           <SalesReport className="w-full" />
//         </div>

//         {/* <PromotionalSales className="w-full" /> */}
//       </div>
//     </div>
//   );
// }




import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import WelcomeBanner from '@components/banners/welcome';
import StatCards from '@/app/shared/ecommerce/dashboard/stat-cards';
import ProfitWidget from '@/app/shared/ecommerce/dashboard/profit-widget';
import SalesReport from '@/app/shared/ecommerce/dashboard/sales-report';
import RepeatCustomerRate from '@/app/shared/ecommerce/dashboard/repeat-customer-rate';
import PromotionalSales from '@/app/shared/ecommerce/dashboard/promotional-sales';
import { PiArrowRightBold } from 'react-icons/pi';
import imagedashbaord from '@public/imagedashbaord.png';
import HandWaveIcon from '@components/icons/hand-wave';
import BarChartList from "src/app/shared/ecommerce/dashboard/dsoCard.tsx";

export default function EcommerceDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        <WelcomeBanner
          title={ 
            <>
              <h2 className="text-2xl font-bold mb-2">Good Morning, <br /> Morgan{' '}
                <HandWaveIcon className="inline-flex h-8 w-8" />
              </h2>  
              <div className="mt-2">
                <h3 className="text-xl font-semibold">9</h3>
                <h4 className="text-sm font-medium">Actions To do</h4>
                <div className="text-sm text-primary mt-1">
                  <h3 className="font-medium">            
                    INR 2,50,400 Collected in the last 7 days
                  </h3>
                </div>
              </div>
            </>
          }
          media={
            <div className="absolute -bottom-6 end-4 hidden w-[200px] sm:block lg:w-[300px] xl:-bottom-7 xl:w-[310px]">
              <div className="relative">
                <Image
                  src={imagedashbaord}
                  alt="Welcome dashboard image"
                  className="dark:brightness-95 dark:drop-shadow-md"
                  style={{
                    position: "relative",
                    top: "-40px",
                    left: "-2rem",
                    height: "17rem"
                  }}
                />
              </div>
            </div>
          }
          contentClassName="sm:max-w-[calc(100%-240px)] lg:max-w-[calc(100%-340px)]"
          className="border border-muted bg-gray-0 pb-6 lg:pb-7 dark:bg-gray-100/30"
        >
          <Link href={routes.eCommerce.createProduct} className="inline-flex mt-4 sm:mt-6">
            <Button variant="outline" className="h-[34px] shadow md:h-9">
              <span>Recover Unpaid Invoices</span>{" "}
              <PiArrowRightBold strokeWidth="2" className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </WelcomeBanner>

        <StatCards className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <BarChartList className="w-full h-[464px] sm:h-[520px]"/>
          <PromotionalSales className="w-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <ProfitWidget className="w-full h-[464px] sm:h-[520px]" />
          <RepeatCustomerRate className="w-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-5">
          <SalesReport className="w-full" />
        </div>
      </div>
    </div>
  );
}