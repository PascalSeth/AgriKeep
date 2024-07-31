import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import *  as WebBrowser from "expo-web-browser"
import { useWarmUpBrowser } from "../hooks/useWarmUpWebBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { supabase } from "../../lib/supabase";


WebBrowser.maybeCompleteAuthSession()
const SigninScreen = () => {
  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        // redirectUrl: Linking.createURL('/'),
      });
  
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        
        if (signUp?.emailAddress) {
          // Logging the signUp object to verify its properties
          console.log('SignUp Object:', signUp);
  
          // Extract properties from signUp
          const { firstName, emailAddress, hasPassword, username } = signUp;
          
          // Insert user into Supabase
          const { data, error } = await supabase
            .from('User')
            .insert([
              { 
                name: firstName, 
                email: emailAddress, 
              },
            ])
            .select();
  
          if (error) {
            console.error('Supabase Insert Error:', error);
          }
  
          if (data) {
            console.log('User added to database:', data);
          }
        }
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [startOAuthFlow]);
  

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name="arrow-back-outline" color="black" size={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Welcome Back</Text>
      </View>
      {/* form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={30} color="gray" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor="gray"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name="lock" size={30} color="gray" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor="gray"
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}
          >
            <SimpleLineIcons name="eye" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.signinButtonWrapper}>
          <Text style={styles.signinText}>Sign in</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text> */}
        <TouchableOpacity style={styles.googleButtonContainer} onPress={onPress}>
        <Image
            source={require("../../assets/Glogo.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity >
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: 'center'
  },
  backButtonWrapper: {
    height: 40,
    position:"absolute",
    top:60,
    left:10,
    width: 40,
    backgroundColor: "gray",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: "black",
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "gray",
    marginVertical: 10,
  },
  signinButtonWrapper: {
    backgroundColor: "black",
    borderRadius: 100,
    marginTop: 20,
  },
  signinText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    color: "gray",
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: "black",
  },
  signupText: {
    color: "black",
  },
});
