import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import Constants from 'expo-constants';
// import CountryPicker, { getAllCountries, getCallingCode } from 'react-native-country-picker-modal';

function CountryPickerInput(){
    return (
      <View style={styles.container}>
        {/* <CountryPicker 
          withEmoji
        /> */}
        <Text>{getAllCountries !== undefined && 'getAllCountries OK'}</Text>
        <Text>{getCallingCode !== undefined && 'getCallingCode OK'}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    height:50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

export default CountryPickerInput
