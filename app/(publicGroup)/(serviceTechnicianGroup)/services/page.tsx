import SearchBar from "@/components/shared/SearchBar";
import ServiceList from "../_components/services/ServiceList";
import { CardShow } from "@/components/shared/CardShow";
import { Paginations } from "@/components/shared/Pagination";
import { getServices } from "../_action/getServices";


const ServicePage = async ({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams
  // console.log('search ', search)

  const service = await getServices(search)


  return (
    <div className='max-w-7xl mx-auto px-2 py-4'>
      <div className='flxe flex-col space-y-6'>
        <div className='flex flex-col sm:flex-row justify-between space-y-2'>
          <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>All Services ({service?.meta?.total})</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">Per Page: </p>
              <CardShow />
            </div>
            <SearchBar />
          </div>
        </div>
        <ServiceList searchParams={search} meta={service.meta} />
      </div>
    </div>
  );
};

export default ServicePage;