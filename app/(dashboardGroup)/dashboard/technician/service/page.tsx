


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
import { getServices } from '@/app/(publicGroup)/(serviceTechnicianGroup)/_action/getServices';
import { getMyServices } from '../../_action/getMyservices';


const ServicePage = async ({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams
  const categories = await getCategories(search)
  const services = await getMyServices()

  const leng = services?.data.length ?? ''

  return (
    <div className='max-w-7xl mx-auto px-4 py-4'>
      <div className='flxe flex-col space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>My Services ({leng})</p>
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