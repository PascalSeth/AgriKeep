import { createStackNavigator } from '@react-navigation/stack';
import OnboardHomeScreen from '../auth/OnboardHome';
import SigninScreen from '../auth/SignIn';
import SignupScreen from '../auth/SignUp';
import { RootStackParamList } from '../types/types';

const Onboard = createStackNavigator<RootStackParamList>();

export default function OnboardScreenNav() {
  return (
    <Onboard.Navigator>
      {/* <Onboard.Screen 
        name="OnboardHome" 
        component={OnboardHomeScreen}
        options={{ headerShown: false }}
      /> */}
      <Onboard.Screen 
        name="SignIn" 
        component={SigninScreen}
        options={{ headerShown: false }}
      />
        <Onboard.Screen 
        name="SignUp" 
        component={SignupScreen}
        options={{ headerShown: false }}
      />
         {/* <Onboard.Screen 
        name="ProductDescriptionScreen" 
        component={ProductDescriptionScreen}
        options={{ headerShown: false }}
      /> */}
    </Onboard.Navigator>
  );
}
