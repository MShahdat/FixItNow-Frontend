import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getSingleService } from "../../_action/getSingleService";
import ServiceHeader from "../../_components/booking/ServiceHeader";
import BookingPanel from "../../_components/booking/BookingPanel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReviewSection from "../../_components/booking/ReviewSection";

const ServiceByIdPage = async ({
  params,
}: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const service = await getSingleService(id);

  if (!service?.success || !service?.data) {
    return (
      <p className="py-12 text-center text-red-700">No services found</p>
    );
  }

  const serviceData = service.data;
  const image = serviceData.cover ||
    "https://images.unsplash.com/photo-1605152276897-4f618f831968?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VydmljZXxlbnwwfHwwfHx8MA%3D%3D";
  const technicianId = serviceData.technician?.user?.id ?? "";
  const providerName = `${serviceData.technician?.user?.firstName ?? ""} ${serviceData.technician?.user?.lastName ?? ""}`.trim();

  console.log('technician id ================', technicianId)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-6 lg:gap-10">
          <div>
            <div className="overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
              <img
                src={image}
                alt={serviceData.title}
                className="w-full h-64 sm:h-72 lg:h-80 object-cover"
              />
            </div>

            <ServiceHeader service={serviceData} />
          </div>
          <div className="space-y-6">
            <BookingPanel
              serviceId={serviceData.id}
              bookings={serviceData.bookings}
              price={serviceData.price}
              availableAt={serviceData.availableAt}
            />

            <Link href={technicianId ? `/technicians/${technicianId}` : "/"} className="block">
              <Card className="transition-colors hover:bg-muted/50">
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-11 w-11 shrink-0">
                      <AvatarImage src={serviceData.technician?.user?.avatar ?? ""} alt={providerName} />
                      <AvatarFallback>
                        {providerName
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">
                        {providerName || "Technician"}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-1 text-foreground font-medium">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span>4.5</span>
                        </div>
                        <span>Expert technician</span>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant="link"
                    className="shrink-0 flex items-center gap-0.5 px-0"
                  >
                    View profile
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-6 lg:gap-10">
        <div className="space-y-6 min-w-0">
          <div className="w-full">
            <div className="rounded-3xl border border-border bg-white/80 p-5 shadow-sm dark:bg-slate-950/80 dark:border-slate-800">
              <h2 className="text-lg font-semibold">Service details</h2>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-muted/50 px-4 py-3">
                  <span>Price</span>
                  <span className="font-semibold text-foreground">{serviceData.price} tk</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-muted/50 px-4 py-3">
                  <span>Duration</span>
                  <span className="font-semibold text-foreground">{serviceData.duration}</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-muted/50 px-4 py-3">
                  <span>Type</span>
                  <span className="font-semibold capitalize text-foreground">{serviceData.type}</span>
                </div>
                <div className="space-y-2 rounded-2xl bg-muted/50 p-4">
                  <span className="text-sm font-medium">Locations</span>
                  <div className="flex flex-wrap gap-2">
                    {serviceData.location?.map((loc: string) => (
                      <span key={loc} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 rounded-2xl bg-muted/50 p-4">
                  <span className="text-sm font-medium">Available times</span>
                  <div className="flex flex-wrap gap-2">
                    {serviceData.availableAt?.map((slot: string) => (
                      <span key={slot} className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ReviewSection reviews={serviceData.review} />
        </div>
      </div>
    </div>
  );
};

export default ServiceByIdPage;