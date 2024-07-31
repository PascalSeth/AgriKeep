import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, FontAwesome, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import SettingMenu from '../components/SettingsMenu';
import { useUser } from '@clerk/clerk-expo';

const AccountScreen = () => {
  const {user} = useUser()
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/agrikeeperLogo.png')} className='w-24 mx-2 h-16' />
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image source={{ uri: user?.imageUrl }} style={styles.profileAvatar} />
        <Text style={styles.profileName}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.profileBio}>Bio: Coffee enthusiast. Developer. Music lover.</Text>
      </View>

      <SettingMenu />

      {/* Navigation Options */}
      <ScrollView style={styles.navOptions}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navContent}>
            <Entypo name="documents" size={24} color="gray" />
            <Text style={styles.navText}>Orders</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navContent}>
            <FontAwesome name="heart" size={24} color="gray" />
            <Text style={styles.navText}>Wishlist</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navContent}>
            <MaterialIcons name="message" size={24} color="gray" />
            <Text style={styles.navText}>Messages</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navContent}>
            <Ionicons name="settings" size={24} color="gray" />
            <Text style={styles.navText}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navContent}>
            <Feather name="help-circle" size={24} color="gray" />
            <Text style={styles.navText}>Support</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileBio: {
    fontSize: 14,
    color: '#666',
  },
  navOptions: {
    marginTop: 20,
  },
  navItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
    marginLeft: 10,
  },
});

export default AccountScreen;
