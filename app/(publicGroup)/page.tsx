import { createAccessToken } from "@/services/createAccessToken";
import { getMe } from "@/services/getMe";
import HeroSection from "./_components/Hero";


const HomePage = async () => {
  const me = await getMe()
  console.log('me ', me)

  const result = await createAccessToken()
  console.log('accessTonen ', result)

  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default HomePage;