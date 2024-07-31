import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './Apps/components/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import OnboardHomeScreen from './Apps/auth/OnboardHome';
import OnboardScreenNav from './Apps/Navigations/OnboardingScreenNav';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import CartScreen from './Apps/screens/CartScreen';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

export default function App() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <NavigationContainer>
      <SignedIn>
   <TabNavigator/>
   {/* <CartScreen /> */}
         </SignedIn>
      <SignedOut>
  <OnboardScreenNav />

      </SignedOut>
   
      </NavigationContainer>
      </ClerkProvider>
  );
}
