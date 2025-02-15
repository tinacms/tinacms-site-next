'use client';

import { DefaultSeo } from 'next-seo';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: any | any[];
  color?: 'white' | 'secondary' | 'seafoam';
  sticky?: boolean;
}

export const Layout = ({ children, color, sticky = true }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col min-h-screen blob-bg font-sans bg-blob-bg bg-[length:100%_100%] bg-top bg-fixed">
        <DefaultSeo
          openGraph={{
            url: 'https://tina.io' + pathname,
          }}
        />
        <div className="pb-0 lg:pb-20">
          <Navbar sticky={sticky} />
        </div>
        <div className="flex flex-col flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
};
