import { View, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase'; // Adjust the import based on your project structure
import SkeletonLoader from './SkeletonLaoder';

type Props = {}

interface SliderImage {
  id: string;
  imageUrl: string;
}

const Slider = (props: Props) => {
  const [images, setImages] = useState<SliderImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const flatListRef = useRef<FlatList>(null);
  let scrollValue = 0;
  let scrolled = 0;

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const { data, error } = await supabase
          .from('Slider')
          .select('*');
        
        if (error) {
          throw new Error('Error fetching slider images');
        }
        
        const sliderImages = data.map((item: any) => ({
          id: item.id,
          imageUrl: item.imageUrl 
        }));
        console.log(sliderImages)

        setImages(sliderImages);
      } catch (error:any) {
        console.error('Error fetching slider images:', error.message);
        setError('Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      scrolled++;
      if (scrolled < images.length) {
        scrollValue = scrollValue + 380; 
      } else {
        scrollValue = 0;
        scrolled = 0;
      }
      flatListRef.current?.scrollToOffset({ animated: true, offset: scrollValue });
    }, 3000); 

    return () => clearInterval(interval);
  }, [images]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <SkeletonLoader/>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
      {error}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={images}
        ref={flatListRef}
        renderItem={({ item }) => (
          <Image 
          source={{ uri: `https://tdxrahrdpmtalmnxeohv.supabase.co/storage/v1/object/public/images/${item.imageUrl}` }} 
          style={styles.image} />
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  image: {
    width: 380,
    height: 200,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: 'stretch',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Slider;
