import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';
import SkeletonLoader from './SkeletonLaoder';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  categoryId: string;
  farmerId: string;
  category: string;
  farmer: string;
  farmerImageUrl: string;
}

const LatestPost = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: productData, error: productError } = await supabase
          .from('Product')
          .select('*');

        if (productError) {
          throw new Error('Error fetching products');
        }

        const updatedProducts: Product[] = await Promise.all(productData.map(async (product) => {
          const { data: categoryData, error: categoryError } = await supabase
            .from('Category')
            .select('name')
            .eq('id', product.categoryId)
            .single();

          const { data: farmerData, error: farmerError } = await supabase
            .from('Farmer')
            .select('name, imageUrl')
            .eq('id', product.farmerId)
            .single();

          if (categoryError) {
            throw new Error('Error fetching category');
          }
          if (farmerError) {
            throw new Error('Error fetching farmer');
          }

          return {
            ...product,
            category: categoryData?.name || 'Unknown Category',
            farmer: farmerData?.name || 'Unknown Farmer',
            farmerImageUrl: farmerData?.imageUrl || 'Unknown'
          };
        }));

        setProducts(updatedProducts);
      } catch (error: any) {
        console.error('Error fetching products:', error.message);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <SkeletonLoader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Posts</Text>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: `https://tdxrahrdpmtalmnxeohv.supabase.co/storage/v1/object/public/images/${item.imageUrl}` }} style={styles.postImage} />
            <View style={styles.textContainer}>
              <Text style={styles.postTitle}>{item.name}</Text>
              <Text style={styles.postPrice}>GH₵{item.price}</Text>
            </View>
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.postCategory}>{item.category}</Text>
              </View>
              <View style={styles.farmerContainer}>
                <Image source={{ uri: `https://tdxrahrdpmtalmnxeohv.supabase.co/storage/v1/object/public/images/${item.farmerImageUrl}` }} style={styles.farmerImage} />
                <Text style={styles.postCompany}>{item.farmer}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postPrice: {
    fontSize: 14,
    color: 'green',
  },
  postCategory: {
    fontSize: 8,
    height: 'auto',
    color: 'white',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  postCompany: {
    fontSize: 9,
    marginLeft:5,
    color: '#555',
  },
  farmerImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  farmerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LatestPost;
