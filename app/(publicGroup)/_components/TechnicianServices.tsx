// app/(publicGroup)/_components/TechnicianServices.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ITechnicianService } from "@/lib/interface";

export function TechnicianServices({
  services,
  technicianId,
}: {
  services: ITechnicianService[];
  technicianId: string;
}) {
  const activeServices = services.filter((s) => s.isActive);

  if (activeServices.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No services listed yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {activeServices.map((service) => (
        <Card key={service.id} className="overflow-hidden">
          {service.cover && (
            <div className="relative h-36 w-full">
              <Image
                unoptimized
                src={service.cover}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <CardContent className="flex flex-col gap-3 p-5">
            <h3 className="font-medium">{service.title}</h3>

            <p className="line-clamp-2 text-sm text-muted-foreground">
              {service.description}
            </p>

            <div className="space-y-1 text-xs text-muted-foreground">
              {service.duration && (
                <p className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {service.duration}
                </p>
              )}
              {service.location.length > 0 && (
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {service.location.join(", ")}
                </p>
              )}
            </div>

            {service.availableAt.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {service.availableAt.map((day) => (
                  <Badge key={day} variant="outline" className="text-xs">
                    {day.slice(0, 3)}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="font-semibold">
                ${service.price}
                <span className="text-xs font-normal text-muted-foreground">
                  {" "}
                  · {service.type}
                </span>
              </span>
              <Button size="sm" variant="outline" asChild>
                <Link
                  href={`/services/${service.id}`}
                >
                  Select
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}