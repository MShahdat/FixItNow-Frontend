import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Star, Clock3 } from 'lucide-react';
import { Technician } from '@/lib/interface';
import Link from 'next/link';

const FALLBACK_IMAGE =
  'https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHVtbXklMjBwcm9maWxlfGVufDB8fDB8fHww';

const TechnicianCard = ({ technician }: { technician: Technician }) => {
  const fullName = `${technician.firstName} ${technician.lastName}`;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      {/* Header band */}
      <div className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />

      <div className="flex flex-col items-center px-6 pb-6">
        {/* Avatar overlaps the header band */}
        <div className="relative -mt-10">
          <Avatar className="h-20 w-20 rounded-full ring-4 ring-white shadow-md">
            <AvatarImage src={technician.profileImage} alt={fullName} />
            <AvatarFallback className="p-0">
              <img
                src={FALLBACK_IMAGE}
                alt={fullName}
                className="h-20 w-20 rounded-full object-cover"
              />
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 ring-2 ring-white">
            <BadgeCheck className="h-4 w-4 text-white" />
          </span>
        </div>

        {/* Name */}
        <h1 className="mt-3 text-lg font-semibold text-slate-900">{fullName}</h1>

        {/* Role chip */}
        <span className="mt-1 inline-flex items-center rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium uppercase tracking-wide text-slate-600">
          Electrician
        </span>

        {/* Stats row */}
        <div className="mt-4 flex w-full items-center justify-center divide-x divide-slate-200 rounded-xl bg-slate-50 py-3">
          <div className="flex flex-1 flex-col items-center gap-0.5">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-slate-900">4.4</span>
            </div>
            <span className="text-xs text-slate-500">234 reviews</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-0.5">
            <div className="flex items-center gap-1">
              <Clock3 className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-semibold text-slate-900">
                ${technician.technicianProfile.hourlyRate}
              </span>
            </div>
            <span className="text-xs text-slate-500">per hour</span>
          </div>
        </div>

        {/* CTA */}
        <Link href={`/technicians/${technician.id}`} className="mt-5 w-full">
          <Button className="w-full rounded-lg bg-slate-900 font-medium text-white hover:bg-slate-800">
            View Profile
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default TechnicianCard;