


import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import WelcomeBanner from '@components/banners/welcome';
import StatCards from '@/app/shared/ecommerce/dashboard/stat-cards';
import ProfitWidget from '@/app/shared/ecommerce/dashboard/profit-widget';
import CreditSalesChart from '@/app/shared/ecommerce/dashboard/sales-report';
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
          <Link href="https://www.dashboard.cunsole.com/invoice" className="inline-flex mt-4 sm:mt-6">
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
          <CreditSalesChart className="w-full" />
        </div>
      </div>
    </div>
  );
}