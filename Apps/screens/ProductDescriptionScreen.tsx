import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { supabase } from '../../lib/supabase';

type ProductDescriptionRouteProp = RouteProp<RootStackParamList, 'ProductDescriptionScreen'>;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  farmerId: string;
  farmerName: string;
  farmerImageUrl: string;
}

const ProductDescriptionScreen = () => {
  const route = useRoute<ProductDescriptionRouteProp>();
  const { productName } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data: productData, error: productError } = await supabase
          .from('Product')
          .select('*')
          .eq('name', productName)
          .single();

        if (productError) {
          throw new Error('Error fetching product');
        }

        const { data: farmerData, error: farmerError } = await supabase
          .from('Farmer')
          .select('name, imageUrl')
          .eq('id', productData.farmerId)
          .single();

        if (farmerError) {
          throw new Error('Error fetching farmer');
        }

        setProduct({
          ...productData,
          farmerName: farmerData?.name || 'Unknown Farmer',
          farmerImageUrl: farmerData?.imageUrl || 'Unknown',
        });
      } catch (error: any) {
        console.error('Error fetching product:', error.message);
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>No product found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://tdxrahrdpmtalmnxeohv.supabase.co/storage/v1/object/public/images/${product.imageUrl}` }}
        style={styles.productImage}
      />
            <View style={styles.farmerContainer}>
        <Image
          source={{ uri: `https://tdxrahrdpmtalmnxeohv.supabase.co/storage/v1/object/public/images/${product.farmerImageUrl}` }}
          style={styles.farmerImage}
        />
        <Text style={styles.farmerName}>{product.farmerName}</Text>
      </View>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>GH₵{product.price.toFixed(2)}</Text>
      <Text style={styles.quantity}>Quantity: {product.quantity}</Text>

      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
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
  productImage: {
    width: '100%',
    height: 300,
    borderRadius:20,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
    color: '#666',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 8,
    textAlign: 'right',
  },
  quantity: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'left',
    color: '#555',
  },
  farmerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  farmerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  farmerName: {
    fontSize: 16,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: 'green',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDescriptionScreen;
