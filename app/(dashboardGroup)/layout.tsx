import { Navbar } from '@/components/shared/Navbar';
import { getMe } from '@/services/getMe';
import React, { ReactNode } from 'react';

const DashboardGroupLayout = async ({
  children
}: { children: ReactNode }) => {
  const user = await getMe()
  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
};

export default DashboardGroupLayout;