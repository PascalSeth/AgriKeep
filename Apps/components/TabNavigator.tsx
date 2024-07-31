import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import CategoriesScreen from '../screens/CategoriesScreen'
import CartScreen from '../screens/CartScreen'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AccountScreen from '../screens/AccountScreen'
import MapScreen from '../screens/MapScreen'
import HomeScreenNav from '../Navigations/HomeScreenNav'
import CategoryScreenNav from '../Navigations/CategoryScreenNav'

type Props = {}
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator screenOptions={{headerShown:false,
        tabBarActiveTintColor:'green',
        tabBarHideOnKeyboard:true,
        tabBarStyle:{height:85}
        
      }}
      >
        <Tab.Screen name="home-nav" component={HomeScreenNav}
        options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color, fontSize:12,marginBottom:3}}> Home</Text>
          ),
          tabBarIcon:({color,size})=>(
<FontAwesome name="home" size={size} color={color} />            )
        }}
        />
        <Tab.Screen name="Categories" component={CategoryScreenNav}
                options={{
                  tabBarLabel:({color})=>(
                    <Text style={{color:color, fontSize:12,marginBottom:3}}> Categories</Text>
                  ),
                  tabBarIcon:({color,size})=>(
<MaterialCommunityIcons name="corn" size={size} color={color} />
)                }}
              
        />
           {/* <Tab.Screen name="Map" component={MapScreen}
                options={{
                  tabBarLabel:({color})=>(
                    <Text style={{color:color, fontSize:12,marginBottom:3}}> Map</Text>
                  ),
                  tabBarIcon:({color,size})=>(
<MaterialCommunityIcons name="map" size={size} color={color} />
)                }}
              
        /> */}
        <Tab.Screen name="Cart" component={CartScreen}
               options={{
                tabBarLabel:({color})=>(
                  <Text style={{color:color, fontSize:12,marginBottom:3}}> Cart</Text>
                ),
                tabBarIcon:({color,size})=>(
<FontAwesome6 name="cart-shopping" size={size} color={color} />  
)            }}
               />
               
        <Tab.Screen name="Account" component={AccountScreen}
               options={{
                tabBarLabel:({color})=>(
                  <Text style={{color:color, fontSize:12,marginBottom:3}}> Account</Text>
                ),
                tabBarIcon:({color,size})=>(
      <Ionicons name="person" size={size} color={color} />            )
              }}
               />
      </Tab.Navigator>
  );
}