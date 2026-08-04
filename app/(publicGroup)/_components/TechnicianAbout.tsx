// app/(publicGroup)/_components/TechnicianAbout.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ITechnician } from "@/lib/interface";

const WEEK_ORDER = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function TechnicianAbout({ technician }: { technician: ITechnician }) {
  const profile = technician.technicianProfile;
  const hourlyRate = Number(profile.hourlyRate);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {profile.bio || "This technician hasn't added a bio yet."}
          </p>

          {profile.skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Available days</h3>
            <div className="flex flex-wrap gap-2">
              {WEEK_ORDER.map((day) => {
                const isAvailable = profile.availability.includes(day);
                return (
                  <Badge
                    key={day}
                    variant={isAvailable ? "default" : "outline"}
                    className={
                      isAvailable ? "" : "text-muted-foreground opacity-50"
                    }
                  >
                    {day.slice(0, 3)}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 pt-2 text-sm text-muted-foreground">
            <Card className="max-w-xl">
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Email</p>
                  <p>{technician.email}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="max-w-xl">
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="font-semibold ">Phone</p>
                  <p>{technician.phone}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="max-w-xl">
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Address</p>
                  <p>{technician.address ?? 'Not Added'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit lg:sticky lg:top-6">
        <CardHeader>
          <CardTitle className="text-base">Book this technician</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Starting at</span>
            <span className="font-semibold">
              {hourlyRate > 0 ? `$${hourlyRate}/hr` : "Varies by service"}
            </span>
          </div>
          <Button asChild className="w-full">
            <Link href={`/services`}>
              Choose a service
            </Link>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Pick a service and time on the next step.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}