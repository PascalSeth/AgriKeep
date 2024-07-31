import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { supabase } from '../../lib/supabase';
import SkeletonLoader from '../components/SkeletonLaoder';

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

interface Subcategory {
  id: string;
  name: string;
  imageUrl: string;
  categoryId: string; 
}

const CategoriesScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      // Fetch categories
      const { data: categoryData, error: categoryError } = await supabase
        .from('Category')
        .select('*');

      if (categoryError) {
        console.error('Error fetching categories:', categoryError);
        setLoading(false);
        return;
      }

      setCategories(categoryData);

      // Fetch subcategories
      const { data: subcategoryData, error: subcategoryError } = await supabase
        .from('Subcategory')
        .select('*');

      if (subcategoryError) {
        console.error('Error fetching subcategories:', subcategoryError);
        setLoading(false);
        return;
      }

      setSubcategories(subcategoryData);
      setLoading(false);
    };

    fetchCategoriesAndSubcategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <SkeletonLoader />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Explore Categories</Text>

      <View style={styles.contentContainer}>
        {/* Category List */}
        <View style={styles.categoryList}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedCategory(item)}>
                <View style={styles.categoryItem}>
                  <Image source={{ uri: `https://tdxrahrdpmtalmnxeohv.supabase.co/storage/v1/object/public/images/${item.imageUrl}` }} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Subcategory List */}
        <View style={styles.subcategoryList}>
          {selectedCategory ? (
            <FlatList
              data={subcategories.filter(sub => sub.categoryId === selectedCategory.id)}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.subcategoryItem}
                  onPress={() => navigation.navigate('ProductScreen', { subcategoryId: item.id, subcategoryName: item.name })}
                >
                  <Image source={{ uri: `https://tdxrahrdpmtalmnxeohv.supabase.co/storage/v1/object/public/images/${item.imageUrl}` }} style={styles.subcategoryImage} />
                  <Text style={styles.subcategoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View>
              <Text style={{ textAlign: 'center', marginTop: 20 }}>Select a category to see its subcategories.</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'green',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  categoryList: {
    flex: 0.3,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  subcategoryList: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    elevation: 3,
  },
  categoryItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
  },
  subcategoryItem: {
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    paddingHorizontal: 10,
  },
  subcategoryImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  subcategoryText: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'medium',
    color: '#666',
  },
});

export default CategoriesScreen;
