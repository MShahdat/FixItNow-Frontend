// app/(publicGroup)/_components/TechnicianProfile.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { MapPin, Star } from "lucide-react";
import { ITechnician } from "@/lib/interface";
import { getRatingSummary } from "@/lib/technicianRating";
import { TechnicianAbout } from "./TechnicianAbout";
import { TechnicianServices } from "./TechnicianServices";
import { TechnicianReviews } from "./TechnicianReviews";

export function TechnicianProfile({ technician }: { technician: ITechnician }) {
  const profile = technician.technicianProfile;
  const fullName = `${technician.firstName} ${technician.lastName}`;
  const initials = `${technician.firstName[0] ?? ""}${technician.lastName[0] ?? ""
    }`.toUpperCase();
  const { average, count } = getRatingSummary(technician.reviews);
  const hourlyRate = Number(profile.hourlyRate);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage src={technician.profileImage || undefined} />
              <AvatarFallback className="text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1.5">
              <h1 className="text-xl font-semibold leading-none">
                {fullName}
              </h1>

              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {technician.city}
                {profile.experience > 0 &&
                  ` · ${profile.experience}+ yrs experience`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:border-l sm:pl-6">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">
                {count > 0 ? average.toFixed(1) : "New"}
              </span>
              {count > 0 && (
                <span className="text-sm text-muted-foreground">
                  ({count})
                </span>
              )}
            </div>
            <div className="h-8 w-px bg-border" />
            <p className="text-lg font-semibold leading-none">
              {hourlyRate > 0 ? (
                <>
                  ${hourlyRate}
                  <span className="text-sm font-normal text-muted-foreground">
                    /hr
                  </span>
                </>
              ) : (
                <span className="text-sm font-normal text-muted-foreground">
                  Rate varies by service
                </span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:w-fit">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <TechnicianAbout technician={technician} />
        </TabsContent>
        <TabsContent value="services" className="mt-6">
          <TechnicianServices
            services={profile.services}
            technicianId={technician.id}
          />
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <TechnicianReviews reviews={technician.reviews} />
        </TabsContent>
      </Tabs>
    </div>
  );
}