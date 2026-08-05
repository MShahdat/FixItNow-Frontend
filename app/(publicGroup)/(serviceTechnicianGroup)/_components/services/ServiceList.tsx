

import { Meta, Service } from '@/lib/interface';
import { getServices } from '../../_action/getServices';
import ServiceCard from './ServiceCard';
import { Paginations } from '@/components/shared/Pagination';


type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  }
};


const ServiceList = async ({ searchParams }: Props) => {

  const services = await getServices(searchParams)

  if (!services.success || !services.data?.length) {
    return (
      <p className="py-12 text-center text-red-700">No services found</p>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          services.data.map((item: Service) => (
            <ServiceCard key={item.id} service={item} />
          ))
        }
      </div>
      <Paginations meta={services.meta} />
    </div>
  );
};

export default ServiceList;