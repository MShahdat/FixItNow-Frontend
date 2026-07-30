import { getSingleTechnician } from "../../_action/getSingleTechnician";


const TechnicianByIdPage = async ({
  params,
}: { params: Promise<{ id: string }> }) => {

  const id = await (await (params)).id
  const technician = await getSingleTechnician(id as string)
  // console.log('technician ', technician)

  if (!technician.success || !technician.data) {
    return (
      <p className="py-12 text-center text-red-700">No technician found</p>
    )
  }

  return (
    <div>
      <p> technician id: {technician.data.id}</p>
      email: {technician.data.email}
    </div>
  );
};

export default TechnicianByIdPage;