import { View, Text, Image, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '../../lib/supabase';

type Props = {}

const Header = (props: Props) => {
  const { user } = useUser();
  console.log(user)

  useEffect(() => {
    if (user) {
      updateProfileImage();
    }
  }, [user]);

  const updateProfileImage = async () => {
    if (user?.imageUrl && user?.primaryEmailAddress?.emailAddress) {
      const { data, error } = await supabase
        .from('User')
        .update({ "imageUrl": user?.imageUrl })
        .eq('email', user.primaryEmailAddress.emailAddress)
        .is('imageUrl', null)
        .select();

      if (error) {
        console.error('Error updating profile image:', error);
      } else {
        console.log('Profile image updated:', data);
      }
    }
  };

  return (
    <View className='p-10 pb-5 bg-white w-full'>
      <View className='flex flex-row items-center justify-between'>
        <View>
          <Text className='font-semibold text-[24px]'>Hi, <Text className='text-green-600'>{user?.firstName || 'User'}</Text></Text>
          <Text className='font-[500]'>Stock up on all your agric supplies</Text>
        </View>
        <View>
          <Image 
            source={{ uri: user?.imageUrl || 'https://images.hitpaw.com/topics/3d/profile-photo-1.jpg' }} 
            alt='Profile' 
            className='w-12 h-12 rounded-full' 
          />
        </View>
      </View>
      <View className='mt-5 mx-2'>
        <View className='bg-[#b4aeae39] p-3 w-full flex items-center flex-row rounded-[12px]'> 
          <Ionicons name='search' size={22} />    
          <TextInput placeholder='Search' className='ml-2 w-fit text-[18px]' />
        </View>
      </View>
    </View>
  );
};

export default Header;
