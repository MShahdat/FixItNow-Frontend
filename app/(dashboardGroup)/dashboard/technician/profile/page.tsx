import Profile from '@/app/(dashboardGroup)/_components/Profile';
import { getMe } from '@/services/getMe';
import React from 'react';




const ProfilePage = async () => {
  const profile = await getMe()
  console.log('profile page ', profile)


  return (
    <div className='max-w-7xl mx-auto px-2 pb-28'>
      <div className='max-w-3xl'>
        <Profile profile={profile.data} />
      </div>
    </div>
  );
};

export default ProfilePage;