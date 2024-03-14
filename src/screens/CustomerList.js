import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import Plus from 'react-native-vector-icons/AntDesign';
import PoppinsTextMedium from '../components/electrons/customFonts/PoppinsTextMedium';
import DropDownRegistration from '../components/atoms/dropdown/DropDownRegistration';
import PoppinsTextLeftMedium from '../components/electrons/customFonts/PoppinsTextLeftMedium';
import FastImage from 'react-native-fast-image';
import { useGetQRCustomerListMutation } from '../apiServices/userMapping/userMappingApi';
import { useTranslation } from 'react-i18next';


const CustomerList = ({ navigation }) => {

  const [selectedOption, setSelectedOption] = useState([]);
  const [userList, setUserList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectUsers, setSelectUsers] = useState()
  const [userTypeList, setUserTypeList] = useState()
  const [active, setActive] = useState()
  const [inactive, setInactive] = useState()
  const dispatch = useDispatch()

  const pointSharingData = useSelector(state => state.pointSharing.pointSharing)

  const {t} = useTranslation()


  const userData = useSelector(state => state.appusersdata.userData)
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : '#FFB533';

  const allUsers = useSelector(state => state.appusers.value)
  const gifUri = Image.resolveAssetSource(require('../../assets/gif/loader.gif')).uri;

  var allUsersData = []
  var allUsersList = []

  const [listAddedUserFunc, {
    data: listAddedUserData,
    error: listAddedUserError,
    isLoading: listAddedUserIsLoading,
    isError: listAddedUserIsError
  }] = useGetQRCustomerListMutation();

  useEffect(() => {
    const getData = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username
        );
        const token = credentials.username
        const userId = userData.id
        const type = userData.user_type
        const params = {
          token: token,
          app_user_id: userId,
          // type: type
        }
        console.log("params of listAddedUserFunc", params)
        listAddedUserFunc(params);
      }
    }
    getData()

    console.log("running", )
  }, [])

 




  useEffect(() => {
    const getData = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username
        );
        const token = credentials.username
        const userId = userData.id
        // const type = selectUsers
        const params = {
          token: token,
          app_user_id: userId,
          // type: type
        }
        listAddedUserFunc(params);
      }
    }
    getData()


  }, [])

  useEffect(() => {
    if (listAddedUserData) {
      console.log("listAddedUserData", JSON.stringify(listAddedUserData));

      setUserList(listAddedUserData)

      setTotalCount(listAddedUserData?.body.length)

      let activeArr = listAddedUserData.body?.filter((itm) => {
        return itm.user_status == "1"

      })

      let inactiveArr = listAddedUserData.body?.filter((itm) => {
        return itm.user_status !== "1"

      })
      // console.log("active", activeArr)

      // let inactiveArr = listAddedUserData.body?.map((itm)=>{
      //   if(itm.status !== 1){
      //     return itm.status
      //   }
      //   else{
      //     return []
      //   }

      // })

      // console.log("inactive arr", inactive)





      setActive(activeArr.length);

      setInactive(inactiveArr.length);

      // let tempArr = listAddedUserData.map((itm)=>{
      //     return itm.mapped_user_type
      // })
    }
    else if (listAddedUserError) {
      console.log("listAddedUserError", listAddedUserError)
    }
  }, [listAddedUserData, listAddedUserError])


  const handleData = (data) => {
    console.log("handle data", data)
    setSelectUsers(data?.value)



  }


  const UserListComponent = (props) => {

    const name = props.name
    const index = props.index + 1
    const userType = props.userType
    const mobile = props.mobile
    const status = props.status
    const data = props.item
    const email = props.email
    const product_code = props.product_code
    return (
      <View style={{ backgroundColor: "white", elevation: 5, borderWidth: 1, borderColor: '#DDDDDD', marginTop: 20, }} onPress={() => {
        navigation.navigate("AddedUserScanList", { data: data })
      }}>
        <View style={{ padding: 20, height: 130, width: '90%', backgroundColor: 'white', flexDirection: 'row', borderRadius: 4, justifyContent: 'space-around' }}>
          <View style={{ justifyContent: 'center', }}>
            <View style={{ height: 60, width: 60, borderRadius: 100, backgroundColor: '#80808019', alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ height: 30, width: 30, }} source={require('../../assets/images/userGrey.png')}></Image>
            </View>
          </View>
          <View style={{ width: '80%', alignItems: "flex-start", justifyContent: 'center', height: '100%', padding: 20 }}>
            <PoppinsTextMedium style={{ color: '#413E3E', fontWeight: "700", marginBottom: 5 }} content={`${t("name")} : ${name}`}></PoppinsTextMedium>
            <PoppinsTextMedium style={{ color: '#413E3E', fontWeight: "700", marginBottom: 5 }} content={`${t("Email")} : ${email}`}></PoppinsTextMedium>
            <PoppinsTextMedium style={{ color: '#413E3E', fontWeight: "700", marginBottom: 5 }} content={`${t("Mobile")} : ${mobile}`}></PoppinsTextMedium>
            <PoppinsTextMedium style={{ color: '#413E3E', fontWeight: "700", marginBottom: 5 }} content={`${t("Product Code")} : ${product_code}`}></PoppinsTextMedium>

            
            {/* <PoppinsTextMedium style={{ color: 'grey', fontWeight: "700" }} content={`Status : ${status == 1 ? "Active" : "Inactive"}`}></PoppinsTextMedium> */}


          </View>
        </View>
      
      </View>
    )
  }

  return (
    <View style={{ alignItems: "center", justifyContent: 'flex-start', width: '100%', backgroundColor: 'white', flex: 1 }}>
      {/* Navigator */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          backgroundColor: ternaryThemeColor,
          width: '100%',
          // marginTop: 10,
          height: '10%',
          // marginLeft: 20,
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
            source={require('../../assets/images/blackBack.png')}></Image>
        </TouchableOpacity>
        <PoppinsTextMedium
          content="Customer List"
          style={{
            marginLeft: 10,
            fontSize: 16,
            // height:60,
            fontWeight: '700',
            color: 'white',
          }}></PoppinsTextMedium>
      </View>

      <View style={{ height: '90%', width: '100%', justifyContent: 'flex-start', paddingTop: 10 }}>
        {/* {selectedOption.length === 0 && <PoppinsTextMedium style={{ color: 'black', fontSize: 16, margin: 10 }} content="There are no users to select"></PoppinsTextMedium>} */}

        <View style={{ width: '50%', justifyContent: 'flex-start', marginLeft: 10, flexDirection: 'row' }}>
          {
            selectedOption.length !== 0 &&
            <DropDownRegistration
              title={selectedOption?.[0]}
              header={selectedOption?.[0] ? selectedOption?.[0] : selectUsers ? selectUsers : "Select Type"}
              jsonData={{ "label": "UserType", "maxLength": "100", "name": "user_type", "options": [], "required": true, "type": "text" }}
              data={selectedOption}
              handleData={handleData}
            ></DropDownRegistration>
          }


        </View>

 

        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 30 }}>
          {userList && userList?.body?.map((item, index) => {
            return (
              <UserListComponent  name={item.customer_name} mobile={item.customer_phone} key={index} index={index} status={item.user_status} email={item.customer_email} product_code={item.product_code} item={item}></UserListComponent>
            )
          })}
        </ScrollView>


        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20, bottom: 10 }}>
          {/* <PoppinsText content="Add Users" style={{ color: ternaryThemeColor, fontSize: 20 }}></PoppinsText> */}
          {/* <TouchableOpacity onPress={() => { navigation.navigate('AddUser') }} style={{ height: 60, width: 60, borderRadius: 30, alignItems: "center", justifyContent: 'center', marginLeft: 10 }}>
            <Plus name="pluscircle" size={50} color={ternaryThemeColor}></Plus>
          </TouchableOpacity> */}
        </View>
      </View>

      {
        listAddedUserIsLoading && <FastImage
          style={{ width: 100, height: 100, position: 'absolute', marginTop: '70%' }}
          source={{
            uri: gifUri, // Update the path to your GIF
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  box1: {
    height: 125,
    width: 140,
    alignItems: 'center',
    backgroundColor: "#FFF4DE",
    borderRadius: 10,
    // justifyContent: 'center'
    justifyContent: 'space-around',
    padding: 10,
    marginRight: 10
  },
  box2: {
    height: 125,
    width: 140,
    alignItems: 'center',
    backgroundColor: "#DCFCE7",
    borderRadius: 10,
    // justifyContent: 'center'
    justifyContent: 'space-around',
    padding: 10,
    marginRight: 10
  },
  box3: {
    height: 125,
    width: 140,
    alignItems: 'center',
    backgroundColor: "#FFE2E6",
    borderRadius: 10,
    // justifyContent: 'center'
    justifyContent: 'space-around',
    padding: 10,
    marginRight: 10
  },
  boxImage: {
    height: 51,
    width: 72
  },
  boxImage2: {
    height: 39,
    width: 38
  }
})

export default CustomerList;