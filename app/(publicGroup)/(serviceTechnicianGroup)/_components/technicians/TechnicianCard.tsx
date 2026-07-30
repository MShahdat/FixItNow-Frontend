import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Star, Turntable } from 'lucide-react';
import { Technician } from '@/lib/interface';
import Link from 'next/link';



const TechnicianCard = ({ technician }: { technician: Technician }) => {

  const firstName = technician.firstName
  const lastName = technician.lastName

  const fullName = firstName + ' ' + lastName


  return (
    <Card >
      <div className='flex flex-col items-center text-center justify-center gap-2'>
        <Avatar className='w-28 h-28 '>
          <AvatarImage src={''} />
          <AvatarFallback>
            <img src={'https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHVtbXklMjBwcm9maWxlfGVufDB8fDB8fHww'} className='w-28 h-28 rounded-full object-contain' />
          </AvatarFallback>
        </Avatar>
        <div className='flex items-center gap-1'>
          <h1 className='text-lg font-medium'>{fullName}</h1>
          {/* <p className='font-semibold text-primary'>(Verified)</p> */}
          <BadgeCheck className='mt-0.5 size-4 text-primary' />
        </div>
        <div className='flex items-center gap-4'>
          <p >Elecrician</p>

        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1'>
            <Star className='size-4' />
            <p className='font-medium'>4.4(234)</p>
          </div>
          <div className='flex items-center gap-1'>
            <Turntable className='size-4' />
            <p className='font-medium'>{technician.technicianProfile.hourlyRate} / hr</p>
          </div>
        </div>
        <div className='w-full'>
          <Link href={`/technicians/${technician.id}`}>
            <Button className='w-4/5'>View Profile</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default TechnicianCard;