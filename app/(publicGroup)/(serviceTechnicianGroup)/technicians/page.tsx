import React from 'react';
import TechnicianList from '../_components/technicians/TechnicianList';
import SearchBar from '@/components/shared/SearchBar';
import { CardShow } from '@/components/shared/CardShow';
import { Paginations } from '@/components/shared/Pagination';
import { getTechnicians } from '../_action/getTechnicians';

const TechnicianPage = async ({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams

  const technicians = await getTechnicians(search)

  return (
    <div className='max-w-7xl mx-auto px-4 py-4'>
      <div className='flxe flex-col space-y-6'>
        <div className='flex items-center justify-between'>
          <p className='text-2xl font-semibold'>All Technicians {20}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">Per Page: </p>
              <CardShow />
            </div>
            <SearchBar />
          </div>
        </div>
        <TechnicianList searchParams={search} />
        <p className='text-center'>pagination</p>
        <Paginations meta={technicians.meta}></Paginations>
      </div>
    </div>
  );
};

export default TechnicianPage;