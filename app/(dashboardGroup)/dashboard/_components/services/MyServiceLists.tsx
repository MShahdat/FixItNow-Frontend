import React from 'react';
import { getMyServices } from '../../_action/getMyservices';
import ServiceCard from './ServiceCard';
import { MY_SERVICE } from '@/lib/interface';
import { getCategories } from '../../_action/getCategories';

const MyServiceLists = async () => {
  const services = await getMyServices()
  // console.log('services ', services)


  const categories = await getCategories()
  // console.log('categories ', categories)

  if (!services.success || !services.data?.length) {
    return (
      <p className="py-12 text-center text-red-700">No services found</p>
    )
  }



  return (
    <div className='max-w-7xl mx-auto px-2 py-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 space-y-1 gap-4'>
        {
          services.data.map((item: MY_SERVICE) => (
            <ServiceCard key={item.id} service={item} categories={categories.data} />
          ))
        }
      </div>
    </div>
  );
};

export default MyServiceLists;