import React, { ReactNode } from 'react';

const LayoutPage = ({
  children,
}: { children: ReactNode }) => {
  return (
    <div>
      {/* <p>public grp layout</p> */}
      {children}
    </div>
  );
};

export default LayoutPage;