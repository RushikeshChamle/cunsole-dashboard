import { Toaster } from 'react-hot-toast';

import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from '@/app/fonts';
import cn from '@utils/class-names';
import NextProgress from '@components/next-progress';
import { AuthProvider } from './AuthContext';


// styles
import 'swiper/css';
import 'swiper/css/navigation';
import '@/app/globals.css';



export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}>
              <AuthProvider>
          <ThemeProvider>
            <NextProgress />
            {children}
            <Toaster />
            <GlobalDrawer/>
            <GlobalModal />
          </ThemeProvider>
          </AuthProvider>
      </body>
    </html>
  );
}





