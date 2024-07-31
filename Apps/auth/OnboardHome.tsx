import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";

const OnboardHomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate("SignIn");
  };

  const handleSignup = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require("../../assets/agrikeeperLogo.png")} style={styles.logo} /> */}
      <Image source={require("../../assets/agrikeeperLogo.png")} style={styles.bannerImage} />
      <Text style={styles.title}>Lorem ipsum dolor.</Text>
      <Text style={styles.subTitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore 
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.loginButtonWrapper, { backgroundColor: "black" }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign-up</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default OnboardHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logo: {
    height: 40,
    width: 140,
    marginVertical: 30,
  },
  bannerImage: {
    marginVertical: 20,
    height: 250,
    width: 231,
  },
  title: {
    fontSize: 40,
    paddingHorizontal: 20,
    textAlign: "center",
    color: "black",
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: "gray",
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "black",
    width: "80%",
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
  signupButtonText: {
    fontSize: 18,
  },
});
