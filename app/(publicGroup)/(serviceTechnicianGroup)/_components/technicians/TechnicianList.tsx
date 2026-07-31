import { Service, Technician } from "@/lib/interface";
import TechnicianCard from "./TechnicianCard";
import { getTechnicians } from "../../_action/getTechnicians";


type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};


const TechnicianList = async ({ searchParams }: Props) => {

  const technician = await getTechnicians(searchParams)

  if (!technician.success || !technician.data?.length) {
    return (
      <p className="py-12 text-center text-red-700">No technician found</p>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          technician.data.map((item: Technician) => (
            <TechnicianCard key={item.id} technician={item} />
          ))
        }
      </div>
    </div>
  );
};

export default TechnicianList;