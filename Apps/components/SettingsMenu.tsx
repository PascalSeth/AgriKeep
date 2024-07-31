import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {};

// Dummy data for categories
const SettingData = [
  { id: '1', name: 'Pending payments', icon: 'cash-multiple' },
  { id: '2', name: 'In Transit', icon: 'truck-delivery-outline' },
  { id: '3', name: 'Pending Refunds', icon: 'credit-card-refund' },
  { id: '4', name: 'Returns & Refunds', icon: 'cash-refund' },
];

const SettingMenu = (props: Props) => {
  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <FlatList
        horizontal
        contentContainerStyle={styles.flatList}
        data={SettingData}
        renderItem={({ item }) => (
          <View style={styles.settingContainer}>
            <Icon name={item.icon} size={30} color="gray" />
            <Text style={styles.settingName}>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor:'white',

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'gray',
  },
  viewAll: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
  },
  flatList: {
    alignItems: 'center',
  },
  settingContainer: {
    marginRight: 5,
    alignItems: 'center',
    width: Dimensions.get('window').width / 4, 
    },
  settingName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pendingContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  }
});

export default SettingMenu;
