import { getSingleService } from "../../_action/getSingleService";



const ServiceByIdPage = async ({
  params,
}: { params: Promise<{ id: string }> }) => {

  const id = await (await (params)).id


  const service = await getSingleService(id as string)


  if (!service.success || !service.data) {
    return (
      <p className="py-12 text-center text-red-700">No services found</p>
    )
  }

  return (
    <div>
      <p>service id: {service.data.id}</p>
    </div>
  );
};

export default ServiceByIdPage;