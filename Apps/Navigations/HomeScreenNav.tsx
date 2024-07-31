import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ItemList from '../screens/itemList';
import { RootStackParamList } from '../types/types';
import ProductScreen from '../screens/ProductScreen';
import ProductDescriptionScreen from '../screens/ProductDescriptionScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function HomeScreenNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Item-List" 
        component={ItemList}
        options={({ route }) => ({ title: route.params?.category })}
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
