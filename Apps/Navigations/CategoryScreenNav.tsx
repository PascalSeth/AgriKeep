import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ItemList from '../screens/itemList';
import { RootStackParamList } from '../types/types';
import ProductScreen from '../screens/ProductScreen';
import ProductDescriptionScreen from '../screens/ProductDescriptionScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function CategoryScreenNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Category" 
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen 
        name="ProductScreen" 
        component={ProductScreen}
        options={({ route }) => ({ title: route.params?.subcategoryName })}
      />
         <Stack.Screen 
        name="ProductDescriptionScreen" 
        component={ProductDescriptionScreen}
        options={({ route }) => ({ title: route.params?.productName })}
      />
    </Stack.Navigator>
  );
}
