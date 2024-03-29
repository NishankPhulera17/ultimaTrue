import React, { useEffect, useId, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  Dimensions,
  Text,
  Linking,
} from 'react-native';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import * as Keychain from 'react-native-keychain';
import { useSelector } from 'react-redux';
import Whatsapp from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';


const HelpAndSupport = ({ navigation }) => {
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : 'grey';
  const supportMobile = useSelector(state => state.apptheme.customerSupportMobile)
  const supportMail = useSelector(state => state.apptheme.customerSupportMail)
  console.log(supportMail, supportMobile)
  const {t} = useTranslation()
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: "white",
        // height: '100%',
      }}>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '100%',
          marginTop: 10,
          // height: '10%',
          marginLeft: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{
              height: 24,
              width: 24,
              resizeMode: 'contain',
              marginLeft: 10,
            }}
            source={require('../../../assets/images/blackBack.png')}></Image>
        </TouchableOpacity>
        <PoppinsTextMedium
          content={t("help and support")}
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: '700',
            color: 'black',
          }}></PoppinsTextMedium>
      </View>
      <ScrollView style={{ width: '100%', height: '100%' , marginTop:'10%'}}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '40%' }}>
          <Image style={{ height: 300, width: 300, resizeMode: "contain" }} source={require('../../../assets/images/customerSupportnew.png')}></Image>
        </View>
        <View style={{ width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: ternaryThemeColor, alignItems: 'center', justifyContent: 'flex-start', height: '80%' }}>
          <TouchableOpacity onPress={() => { Linking.openURL(`mailto:${supportMail}`) }} style={{ width: '90%', alignItems: 'center', justifyContent: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#DDDDDD', marginTop: 10 }}>
            <View style={{ height: 60, width: 60, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
              <Image style={{ height: 40, width: 40, resizeMode: "contain" }} source={require('../../../assets/images/whitemail.png')}></Image>
            </View>
            <PoppinsTextMedium
              content="Mail us"
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '700',
                color: 'white',
              }}></PoppinsTextMedium>
            <PoppinsTextMedium
              content={supportMail}
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '700',
                color: 'white',
              }}></PoppinsTextMedium>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Linking.openURL(`whatsapp://send?text=Hi Welcome To BTPL World&phone=+201023666065`) }} style={{ width: '90%', alignItems: 'center', justifyContent: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#DDDDDD', marginTop: 10 }}>
            <View style={{ height: 60, width: 60, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
              <Whatsapp name="whatsapp" size={40} color="white"></Whatsapp>
            </View>
            <PoppinsTextMedium
              content="Whatsapp us"
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '700',
                color: 'white',
              }}></PoppinsTextMedium>
            <PoppinsTextMedium
              content={supportMobile}
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '700',
                color: 'white',
              }}></PoppinsTextMedium>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Linking.openURL(`tel:${supportMobile}`) }} style={{ width: '90%', alignItems: 'center', justifyContent: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#DDDDDD', marginTop: 10 }}>
            <View style={{ height: 60, width: 60, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
              <Image style={{ height: 40, width: 40, resizeMode: "contain" }} source={require('../../../assets/images/whitemobile.png')}></Image>
            </View>
            <PoppinsTextMedium
              content="Call us"
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '700',
                color: 'white',
              }}></PoppinsTextMedium>
            <PoppinsTextMedium
              content={supportMobile}
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '700',
                color: 'white',
              }}></PoppinsTextMedium>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={()=>{Linking.openURL(`whatsapp://send?phone=${"+201023666065"}`)}} style={{width:'90%',alignItems:'center',justifyContent:'center',paddingBottom:20,borderBottomWidth:1,borderColor:'#DDDDDD',marginTop:10}}>
              <View style={{height:60,width:60,borderRadius:30,alignItems:"center",justifyContent:"center"}}>
                <Image style={{height:60,width:60,resizeMode:"contain"}} source={require('../../../assets/images/whatsapp-icon.png')}></Image>
              </View>
              <PoppinsTextMedium
          content="Whatsapp us"
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: '700',
            color: 'white',
          }}></PoppinsTextMedium>
          <PoppinsTextMedium
          content={supportMobile}
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: '700',
            color: 'white',
          }}></PoppinsTextMedium>
            </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({})

export default HelpAndSupport;
