// app/technicians/[id]/page.tsx

import { TechnicianProfile } from "@/app/(publicGroup)/_components/TechnicianProfile";
import { getSingleTechnician } from "../../_action/getSingleTechnician";

const TechnicianByIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const technician = await getSingleTechnician(id);

  if (!technician.success || !technician.data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">No technician found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <TechnicianProfile technician={technician?.data} />
    </div>
  );
};

export default TechnicianByIdPage;