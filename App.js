import React,{useEffect} from 'react';
import {View, StyleSheet, SafeAreaView,Alert} from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import { store } from './redux/store';
import { Provider } from 'react-redux'
import messaging from '@react-native-firebase/messaging';    
import { useTranslation } from 'react-i18next'; // Import useTranslation


const App = () => {
  const { t } = useTranslation(); // Initialize useTranslation

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
        
        return unsubscribe;
      }, []);

      
    return (
        <Provider store={store}>
        <SafeAreaView style={{flex:1}}>
            <StackNavigator></StackNavigator>
        </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({})

export default App;
