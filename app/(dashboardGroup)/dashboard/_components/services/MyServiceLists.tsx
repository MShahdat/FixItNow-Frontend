

import { Paginations } from '@/components/shared/Pagination';
import ServiceCard from './ServiceCard';
import { MY_SERVICE } from '@/lib/interface';

type Props = {
  services: any
  categories: any
}

const MyServiceLists = async ({ services, categories }: Props) => {

  return (
    <div className='max-w-7xl mx-auto px-2 py-4'>
      <div className='space-y-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 space-y-1 gap-4'>
          {
            services.data.map((item: MY_SERVICE) => (
              <ServiceCard key={item.id} service={item} categories={categories.data} />
            ))
          }
        </div>
        <Paginations meta={services.meta} />
      </div>
    </div>
  );
};

export default MyServiceLists;