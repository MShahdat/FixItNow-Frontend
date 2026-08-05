import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Service } from '@/lib/interface';
import { Clock, Star, Wallet } from 'lucide-react';
import Link from 'next/link';

const ServiceCard = ({ service }: { service: Service }) => {

  const firstName = service?.technician?.user?.firstName;
  const lastName = service?.technician?.user?.lastName;
  const fullName = `${firstName ?? ''} ${lastName ?? ''}`.trim();

  const reviewList = Array.isArray((service as Service & { review?: unknown[] }).review)
    ? (service as Service & { review?: unknown[] }).review ?? []
    : [];

  const averageRating = reviewList.length
    ? (reviewList.reduce<number>((sum, review) => sum + (Number((review as { rating?: number }).rating) || 0), 0) / reviewList.length).toFixed(1)
    : '0.0';

  const image =
    'https://images.unsplash.com/photo-1605152276897-4f618f831968?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VydmljZXxlbnwwfHwwfHx8MA%3D%3D';

  return (
    <Card className='group overflow-hidden rounded-2xl border border-neutral-200 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
      {/* Image */}
      <div className='relative h-48 w-full overflow-hidden'>
        <img
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
          src={service?.cover || image}
          alt={service?.title || 'service image'}
        />

        {/* Rating badge */}
        <div className='absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-neutral-800 shadow-sm backdrop-blur-sm'>
          <Star className='size-3.5 fill-amber-400 text-amber-400' />
          <span>{service.reviews?.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col gap-3 px-4 pb-4 pt-3'>
        <div className='space-y-0.5'>
          <p className='line-clamp-1 text-lg font-semibold leading-tight text-neutral-900'>
            {service?.title}
          </p>
          <p className='text-sm text-neutral-500'>By {fullName || 'Unknown technician'}</p>
        </div>

        <div className='flex items-center gap-4 border-t border-neutral-100 pt-3 text-sm text-neutral-600'>
          <div className='flex items-center gap-1.5'>
            <Wallet className='size-4 text-neutral-400' />
            <span className='font-medium text-neutral-800'>{service.price} tk</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <Clock className='size-4 text-neutral-400' />
            <span>{service.duration}</span>
          </div>
          <div className='ml-auto flex items-center gap-1.5'>
            <Star className='size-4 fill-amber-400 text-amber-400' />
            <span className='font-medium text-neutral-800'>{averageRating}</span>
          </div>
        </div>

        <Link href={`/services/${service.id}`} className='mt-1'>
          <Button variant='default' className='w-full rounded-xl'>
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ServiceCard;