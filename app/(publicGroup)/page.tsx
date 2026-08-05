import { createAccessToken } from "@/services/createAccessToken";
import { getMe } from "@/services/getMe";
import HeroSection from "./_components/Hero";
import ServicePage from "./(serviceTechnicianGroup)/services/page";
import { getServices } from "./(serviceTechnicianGroup)/_action/getServices";
import ServiceList from "./(serviceTechnicianGroup)/_components/services/ServiceList";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const HomePage = async ({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams
  // console.log('search ', search)

  const service = await getServices(search)

  const me = await getMe()
  console.log('me ', me)

  const result = await createAccessToken()
  console.log('accessTonen ', result)

  return (
    <div>
      <HeroSection />
      <hr className="w-full h-[1px] bg-[#7e7a71]" />
      <div className="bg-[#F5F2EC]">
        <div className="max-w-7xl mx-auto px-4 xl:px-8 py-8 space-y-3">
          <div className="flex items-center justify-between pb-4">
            <p className="text-primary text-xl md:text-3xl font-semibold">Services Lists </p>
            <Link href={'/services'}>
              <Button size={'sm'} variant={"default"}>See All</Button>
            </Link>
          </div>
          <ServiceList searchParams={search} meta={service.meta} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;