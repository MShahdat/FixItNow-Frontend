


import ServiceList from '@/app/(publicGroup)/(serviceTechnicianGroup)/_components/services/ServiceList';
import { CardShow } from '@/components/shared/CardShow';
import { Paginations } from '@/components/shared/Pagination';
import SearchBar from '@/components/shared/SearchBar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
import MyServiceLists from '../../_components/services/MyServiceLists';
import { DialogService } from '../../_components/services/Dialogbox';
import { getCategories } from '../../_action/getCategories';


const ServicePage = async () => {

  const categories = await getCategories()


  return (
    <div className='max-w-7xl mx-auto px-4 py-4'>
      <div className='flxe flex-col space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>My Services (20)</p>
          <div className="flex items-center gap-4">
            {/* <Button size={'sm'}>
              <Plus />
              Create Service
            </Button> */}
          </div>
          <DialogService mode={'create'} categories={categories.data} />
        </div>
        <MyServiceLists />
        {/* <Paginations meta={service.meta} /> */}
      </div>
    </div>
  );
};

export default ServicePage;