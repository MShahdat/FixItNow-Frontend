import React from 'react';
import TechnicianList from '../_components/technicians/TechnicianList';

const TechnicianPage = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='flxe flex-col space-y-6'>
        <div className='flex items-center justify-between'>
          <p className='text-2xl font-semibold'>All Technicians {20}</p>
        </div>
        <TechnicianList />
      </div>
    </div>
  );
};

export default TechnicianPage;