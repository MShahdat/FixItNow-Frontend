import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Edit, Edit2, Star, Turntable } from 'lucide-react';
import { DialogService } from './Dialogbox';
import { Categories, MY_SERVICE } from '@/lib/interface';


type Props = {
  service: MY_SERVICE,
  categories: Categories[]
}


const ServiceCard = ({ service, categories }: Props) => {

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <Badge variant={'outline'}>{service.type}</Badge>
          <div className='flex items-center gap-2'>
            {
              service.isActive ? (
                <Badge variant={'outline'} className='text-primary'>
                  Active
                </Badge>
              ) : (<Badge variant={'destructive'}>
                De-Active
              </Badge>)
            }
            <DialogService mode={'edit'} service={service} categories={categories} />
          </div>
        </div>

        <CardTitle className='mt-4'>{service.title}</CardTitle>
      </CardHeader>
      <CardContent className=''>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1'>
            <Star className='size-4' />
            <p>{0}</p>
          </div>
          <div className='flex items-center gap-1'>
            <Turntable className='size-4' />
            <p className='whitespace-nowrap'>{service.price} tk</p>
          </div>
          <div className='flex items-center gap-1'>
            <Clock className='size-4' />
            <p className='whitespace-nowrap'>{service.duration}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;