import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import { AppProvider } from '@/context/AppContext';
import ScrollToTopRouteChange from '@/components/ScrollToTopRouteChange';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VPP Ecommerce',
  description: 'Hệ thống bán hàng thương mại điện tử bởi Thongular',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Banner />
          <Navbar />
          {children}
          <Footer />
          <ScrollToTopRouteChange />
          <ScrollToTop />
        </AppProvider>
      </body>
    </html>
  );
}
