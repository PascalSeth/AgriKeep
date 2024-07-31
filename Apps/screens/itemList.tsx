import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Adjust import based on your navigation setup
import { supabase } from '../../lib/supabase'; // Adjust the import based on your project structure
import { RootStackParamList } from '../types/types';

interface RouteParams {
  category: string;
  id: string;
}

interface Subcategory {
  id: string;
  name: string;
  imageUrl: string;
  categoryId: string;
}

type ItemListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Item-List'>;

const ItemList = () => {
  const navigation = useNavigation<ItemListScreenNavigationProp>(); // Navigation instance with specific type
  const route = useRoute<RouteProp<RootStackParamList, 'Item-List'>>();
  const params = route.params as RouteParams;
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const { data, error } = await supabase
          .from('Subcategory')
          .select('*')
          .eq('categoryId', params.id);

        if (error) {
          throw new Error('Error fetching subcategories');
        }

        setSubcategories(data || []);
      } catch (error:any) {
        console.error('Error fetching subcategories:', error.message);
      }
    };

    fetchSubcategories();
  }, [params.id]);

  const handleSubcategoryPress = (subcategory: Subcategory) => {
    // Navigate to a new screen with products under the selected subcategory
    navigation.navigate('ProductScreen', {
      subcategoryId: subcategory.id,
      subcategoryName: subcategory.name,
    });
  };

  const renderSubcategoryItem = ({ item }: { item: Subcategory }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSubcategoryPress(item)}>
      <Image
        source={{ uri: `https://tdxrahrdpmtalmnxeohv.supabase.co/storage/v1/object/public/images/${item.imageUrl}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Subcategories</Text>
      <FlatList
        data={subcategories}
        renderItem={renderSubcategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ItemList;
