import { SidebarProvider } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';
import ServicetechnicianSidebar from '@/app/(publicGroup)/_components/ServiceTechnicianSidebar'
import { SidebarMobileTrigger } from '@/app/(publicGroup)/_components/SidebarMobileTrigger'

const ServiceTechnicianLayout = ({
  children,
}: { children: ReactNode }) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      {/* <Navbar user={user} /> */}
      <div className='flex-1 min-h-0 transform-gpu'>
        <SidebarProvider
          className='h-full'>
          <div className='flex flex-1 min-h-0'>
            <ServicetechnicianSidebar />
            <main className='flex-1 min-w-0 overflow-y-auto'>
              {children}
            </main>
          </div>
          <SidebarMobileTrigger />
        </SidebarProvider>
      </div>
    </div>
  );
};

export default ServiceTechnicianLayout;