import ServiceList from '@/app/(publicGroup)/(serviceTechnicianGroup)/_components/services/ServiceList';
import { CardShow } from '@/components/shared/CardShow';
import { Paginations } from '@/components/shared/Pagination';
import SearchBar from '@/components/shared/SearchBar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';


const ServicePage = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-4'>
      <div className='flxe flex-col space-y-6'>
        <div className='flex flex-col sm:flex-row justify-between space-y-2'>
          <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>My Services (20)</p>
          <div className="flex items-center gap-4">
            {/* <SearchBar /> */}
            <Button>
              <Plus />
              Create Service
            </Button>
          </div>
        </div>
        {/* <Paginations meta={service.meta} /> */}
      </div>
    </div>
  );
};

export default ServicePage;