import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

type CategoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Item-List'>;

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

const CategoryMenu = () => {
  const navigation = useNavigation<CategoryScreenNavigationProp>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('Category')
        .select('*');
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(data);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Item-List', { category: item.name, id: item.id})}
            style={styles.categoryContainer}>
            <Image 
              source={{ uri: `https://tdxrahrdpmtalmnxeohv.supabase.co/storage/v1/object/public/images/${item.imageUrl}` }} 
              style={styles.categoryImage} 
            />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewAll: {
    color: 'green',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  categoryName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CategoryMenu;
