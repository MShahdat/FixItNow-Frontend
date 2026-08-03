import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BadgeCent, Clock, Star } from 'lucide-react';




const ServiceHeader = ({ service }: { service: any }) => {

  console.log('service part', service)

  return (
    <div className="mt-3 space-y-3">
      <Badge variant="default" className="capitalize">
        {service?.category?.name}
      </Badge>

      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
        {service.title}
      </h1>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-sm text-muted-foreground">
        <div className="flex items-center gap-1 text-foreground font-medium">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>4.5</span>
        </div>
        <span>(39 reviews)</span>
        <Separator orientation="vertical" className="h-4 hidden sm:block" />
        <span>
          Provided by <span className="text-foreground font-semibold">
            {service.technician?.user?.firstName} {service.technician?.user?.lastName}
          </span>
        </span>
      </div>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        {service.description}
      </p>

      <div className="flex items-center gap-4 sm:gap-6 flex-wrap pt-1">
        <div className="flex items-center gap-1.5 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{service.duration}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
          <BadgeCent className="h-4 w-4" />
          <span>Guaranteed</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeader;