import { View, Text, FlatList } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '../components/Slider';
import CategoryMenu from '../components/CategoryMenu';
import LatestPost from '../components/LatestPost';

const data = [
  { key: 'Header' },
  { key: 'Slider' },
  { key: 'CategoryMenu' },
  { key: 'LatestPost' },
];

type ItemProps = {
  key: string;
};

const renderItem = ({ item }: { item: ItemProps }) => {
  switch (item.key) {
    case 'Header':
      return <Header />;
    case 'Slider':
      return <Slider />;
    case 'CategoryMenu':
      return <CategoryMenu />;
    case 'LatestPost':
      return <LatestPost />;
    default:
      return null;
  }
};

const HomeScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item : any) => item.key}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
