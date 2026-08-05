

import { CardShow } from '@/components/shared/CardShow';

import MyServiceLists from '../../_components/services/MyServiceLists';
import { DialogService } from '../../_components/services/Dialogbox';
import { getMyServices } from '../../_action/getMyservices';
import { getCategories } from '../../_action/getCategories';


const ServicePage = async ({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams

  const categories = await getCategories()

  console.log('all categories ', categories)

  const services = await getMyServices(search)

  if (!services.success) {
    return (
      <p>not service found</p>
    )
  }


  return (
    <div className='max-w-7xl mx-auto px-4 py-4'>
      <div className='flxe flex-col space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>My Services ({services.meta.total})</p>

          <div className='flex items-center gap-4'>
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">Per Page:</p>
              <CardShow />
            </div>
            <DialogService mode={'create'} categories={categories.data} />
          </div>
        </div>
        <MyServiceLists services={services} categories={categories} />
      </div>
    </div>
  );
};

export default ServicePage;