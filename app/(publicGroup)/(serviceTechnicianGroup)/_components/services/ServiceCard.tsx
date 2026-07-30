import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Service } from '@/lib/interface';
import { Clock, Star, Turntable } from 'lucide-react';
import Link from 'next/link';

const ServiceCard = ({ service }: { service: Service }) => {

  console.log('service', service)

  const firstName = service?.technician?.user?.firstName;
  const lastName = service?.technician?.user?.lastName;
  const fullName = firstName + " " + lastName

  return (
    <Card>
      <img className='w-full h-44' src={'https://png.pngtree.com/thumb_back/fh260/background/20230705/pngtree-home-delivery-service-concept-for-families-on-the-move-image_3792155.jpg'} alt='image' />
      <div className='flex flex-col gap-1 px-2 -mt-2'>
        <p className='text-lg font-semibold text-neutral-900'>{service.title}</p>
        <div className='flex items-center justify-between '>
          <div className='flex items-center gap-1'>
            {/* <Wrench className='size-4' /> */}
            <p className='text-[16px] text-neutral-600'> By {fullName}</p>
          </div>
          {/* <Button variant={'ghost'}>Electrical</Button> */}
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-wrap items-center gap-2'>
            <div className='flex items-center gap-1'>
              <Star className='size-4' />
              <p>{0}</p>
            </div>
            <div className='flex items-center gap-1'>
              <Turntable className='size-4' />
              <p>{service.price} tk</p>
            </div>
            <div className='flex items-center gap-1'>
              <Clock className='size-4' />
              <p>{service.duration}</p>
            </div>
          </div>
          <Link href={`/services/${service.id}`}>
            <Button variant={'default'}>Details</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;