import { SidebarProvider } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';
import { SidebarMobileTrigger } from '@/app/(publicGroup)/_components/SidebarMobileTrigger'
import { Navbar } from '@/components/shared/Navbar';
import { getMe } from '@/services/getMe';
import { DashboardSidebar } from './_components/DashboardSidebar';

const DashboardGroupLayout = async ({
  children,
}: { children: ReactNode }) => {

  const user = await getMe()
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Navbar user={user} />
      <div className='flex-1 min-h-0 transform-gpu'>
        <SidebarProvider
          className='h-full'>
          <div className='flex flex-1 min-h-0'>
            <DashboardSidebar user={user} />
            <main className='flex-1 min-w-0 overflow-y-auto pb-20'>
              {children}
            </main>
          </div>
          <SidebarMobileTrigger />
        </SidebarProvider>
      </div>
    </div>
  );
};

export default DashboardGroupLayout;