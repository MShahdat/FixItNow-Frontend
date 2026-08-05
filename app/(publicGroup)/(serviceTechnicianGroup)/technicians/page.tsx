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
    <div className='bg-[#F5F2EC]'>
      <div className='max-w-7xl mx-auto px-4 xl:px-8 py-8'>
        <div className='flxe flex-col space-y-6'>
          <div className='flex flex-col sm:flex-row justify-between space-y-2'>
            <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>All Technicians ({technicians?.meta?.total})</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="whitespace-nowrap">Per Page: </p>
                <CardShow />
              </div>
              <SearchBar />
            </div>
          </div>
          <TechnicianList searchParams={search} meta={technicians.meta} />
        </div>
      </div>
    </div>
  );
};

export default TechnicianPage;