import { createAccessToken } from "@/services/createAccessToken";
import { getMe } from "@/services/getMe";


const HomePage = async () => {
  const me = await getMe()
  console.log('me ', me)

  const result = await createAccessToken()
  console.log('accessTonen ', result)

  return (
    <div>
      hello fixitnow
    </div>
  );
};

export default HomePage;