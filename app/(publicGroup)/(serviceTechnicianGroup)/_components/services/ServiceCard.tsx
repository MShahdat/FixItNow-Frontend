import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Star, Turntable, Wrench } from 'lucide-react';
import React from 'react';

const ServiceCard = () => {
  return (
    <Card>
      <img className='w-full h-44' src={'https://png.pngtree.com/thumb_back/fh260/background/20230705/pngtree-home-delivery-service-concept-for-families-on-the-move-image_3792155.jpg'} alt='image' />
      <div className='flex flex-col gap-1 px-2 -mt-2'>
        <p className='text-lg font-semibold text-neutral-900'>this is title</p>
        <div className='flex items-center justify-between '>
          <div className='flex items-center gap-1'>
            {/* <Wrench className='size-4' /> */}
            <p className='text-[17px] text-neutral-600'> By shahdat hossain</p>
          </div>
          {/* <Button variant={'ghost'}>Electrical</Button> */}
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <Star className='size-4' />
              <p>3.4</p>
            </div>
            <div className='flex items-center gap-1'>
              <Turntable className='size-4' />
              <p>400 tk</p>
            </div>
            <div className='flex items-center gap-1'>
              <Clock className='size-4' />
              <p>4 hours</p>
            </div>
          </div>
          <Button variant={'default'}>Details</Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;