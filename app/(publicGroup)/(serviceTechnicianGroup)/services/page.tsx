import ServiceList from "../_components/services/ServiceList";


const ServicePage = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-4'>
      <div className='flxe flex-col space-y-6'>
        <div className='flex items-center justify-between'>
          <p className='text-2xl font-semibold'>All Services {20}</p>
        </div>
        <ServiceList />
      </div>
    </div>
  );
};

export default ServicePage;