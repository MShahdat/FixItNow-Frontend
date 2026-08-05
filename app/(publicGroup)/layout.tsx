import { Navbar } from '@/components/shared/Navbar';
import { getMe } from '@/services/getMe';
import React, { ReactNode, use } from 'react';

const LayoutPage = async ({
  children,
}: { children: ReactNode }) => {

  const user = await getMe()
  console.log('user', use)


  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
};

export default LayoutPage;