import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useListAddedUsersMutation } from '../../apiServices/listUsers/listAddedUsersApi';
import { useSelector, useDispatch } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import Plus from 'react-native-vector-icons/AntDesign';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import { useFetchUserByUserTypeMutation, useFetchUserMappingByAppUserIdAndMappedUserTypeMutation, useGetQRCustomerListMutation } from '../../apiServices/userMapping/userMappingApi';
import DropDownRegistration from '../../components/atoms/dropdown/DropDownRegistration';
import PoppinsTextLeftMedium from '../../components/electrons/customFonts/PoppinsTextLeftMedium';
import FastImage from 'react-native-fast-image';
import { setCanMapUsers } from '../../../redux/slices/userMappingSlice';
import { useFetchAllQrScanedListMutation } from '../../apiServices/qrScan/AddQrApi';
import { t } from 'i18next';

const ListUsers = ({ navigation, route }) => {

  const [selectedOption, setSelectedOption] = useState([]);
  const [userList, setUserList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectUsers, setSelectUsers] = useState()
  const [userTypeList, setUserTypeList] = useState()
  const [active, setActive] = useState()
  const [inactive, setInactive] = useState()
  const dispatch = useDispatch()

  const pointSharingData = useSelector(state => state.pointSharing.pointSharing)

  const navigationParams = route.params.navigationParams;
  console.log("NP params", navigationParams)

  const userData = useSelector(state => state.appusersdata.userData)
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : '#FFB533';

  const allUsers = useSelector(state => state.appusers.value)
  const gifUri = Image.resolveAssetSource(require('../../../assets/gif/loader.gif')).uri;

  var allUsersData = []
  var allUsersList = []

  const [listAddedUserFunc, {
    data: listAddedUserData,
    error: listAddedUserError,
    isLoading: listAddedUserIsLoading,
    isError: listAddedUserIsError
  }] = useFetchUserByUserTypeMutation();

  const [qrcustomerListFunc, {
    data: qrcustomerListData,
    error: qrcustomerListError,
    isLoading: qrcustomerisLoading,
    isError: qrcustomerListisError
  }] = useGetQRCustomerListMutation();

  useEffect(() => {
    const getData = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username
        );
        // const token = credentials.username
        // const userId = userData.id
        // const type = selectUsers
        // const params = {
        //   token: token,
        //   app_user_id: userId,
        //   type: type
        // }

        console.log("navigation parararararara", navigationParams)

        if (navigationParams === "Customer") {

          const params = {
            app_user_id: userData.id,
            token: credentials.username
          }

          console.log("params in Cust", params)


          qrcustomerListFunc(params)
        }

        else {
          const initialRequest = {
            user_type_id: navigationParams == "Retailer" ? 2 : 3,
            email: "",
            limit: 20,
            offset: 0,
            mobile: "",
            name: "",
            is_scanned: "",
          };

          console.log("params in ret dis", params)
          listAddedUserFunc({
            token: credentials.username,
            body: initialRequest,
            zoneId: "0",
          });
        }

      }

    }


    getData()
  }, [])

  useEffect(() => {
    const userType = userData?.user_type;

    let options = ["influencer", "dealer", "consumer", "sales"];

    const keys = Object.keys(pointSharingData?.point_sharing_bw_user?.user)

    const values = Object.values(pointSharingData?.point_sharing_bw_user?.user)

    console.log("Keys values", keys, values)

    if (keys.includes(userData.user_type)) {
      const index = keys.indexOf(userData.user_type)
      const tempuser = values[index]
      console.log("temp users", tempuser)
      setSelectedOption(tempuser)
      dispatch(setCanMapUsers(tempuser))
    }
  }, [])




  useEffect(() => {
    if (listAddedUserData) {
      console.log("listAddedUserData", JSON.stringify(listAddedUserData));

      setUserList(listAddedUserData.body?.appUsersList)

      setTotalCount(listAddedUserData?.body.length)

      // let activeArr = listAddedUserData.body?.filter((itm) => {
      //   return itm.user_status == "1"

      // })

      // let inactiveArr = listAddedUserData.body?.filter((itm) => {
      //   return itm.user_status !== "1"

      // })
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





      // setActive(activeArr.length);

      // setInactive(inactiveArr.length);

      // let tempArr = listAddedUserData.map((itm)=>{
      //     return itm.mapped_user_type
      // })
    }
    else if (listAddedUserError) {
      console.log("listAddedUserError", listAddedUserError)
    }
  }, [listAddedUserData, listAddedUserError])



  useEffect(() => {
    if (qrcustomerListData) {
      console.log("qrcustomerListData", JSON.stringify(qrcustomerListData));

      setUserList(qrcustomerListData.body)

      setTotalCount(qrcustomerListData?.body.length)

    }
    else if (qrcustomerListError) {
      console.log("qrcustomerListError", qrcustomerListError)
    }
  }, [qrcustomerListData, qrcustomerListError])



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
    return (
      <View style={{ backgroundColor: "white", elevation: 5, borderWidth: 1, borderColor: '#DDDDDD', marginTop: 20, }} onPress={() => {

      }}>
        <View style={{ padding: 6, height: 100, width: '90%', backgroundColor: 'white', flexDirection: 'row', borderRadius: 4, justifyContent: 'space-around' }}>
          <View style={{ justifyContent: 'center', }}>
            <View style={{ height: 60, width: 60, borderRadius: 100, backgroundColor: '#80808019', alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ height: 30, width: 30, }} source={require('../../../assets/images/userGrey.png')}></Image>
            </View>
          </View>
          <View style={{ width: '80%', alignItems: "flex-start", justifyContent: 'center', height: '100%', padding: 20 }}>
            <PoppinsTextMedium style={{ color: '#413E3E', fontWeight: "700", marginBottom: 5 }} content={`${t("name")} : ${name}`}></PoppinsTextMedium>
            <PoppinsTextMedium style={{ color: '#413E3E', fontWeight: "700", marginBottom: 5 }} content={`${t("User Type")} : ${userType}`}></PoppinsTextMedium>
            <PoppinsTextMedium style={{ color: '#413E3E', fontWeight: "700", marginBottom: 5 }} content={`${t("Mobile")} : ${mobile}`}></PoppinsTextMedium>
            {/* <PoppinsTextMedium style={{ color: 'grey', fontWeight: "700" }} content={`Status : ${status == 1 ? "Active" : "Inactive"}`}></PoppinsTextMedium> */}


          </View>
        </View>
        <View style={{ backgroundColor: status == 1 ? "#DCFCE7" : "#FFE2E6", height: 50, justifyContent: 'center' }}>
          <PoppinsTextMedium style={{ color: '#413E3E', fontWeight: "700" }} content={`${status == 1 ? t("Verified") : "Not Verified"}`}></PoppinsTextMedium>
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
            source={require('../../../assets/images/blackBack.png')}></Image>
        </TouchableOpacity>
        <PoppinsTextMedium
          content={navigationParams == "Retailer" ? t("Authorised Retailer List") : t("Authorised Customer List")}
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

          {console.log("userList",userList)}
        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 30 }}>
          {userList && userList.map((item, index) => {
            return (
           navigation !== "Customer" ?   navigationParams == "Retailer" ? item.user_type_id == "2" && <UserListComponent userType={item.user_type} name={item.name} mobile={item.mobile} key={index} index={index} status={item.status} item={item}></UserListComponent>
                : item.user_type_id == "3" && <UserListComponent userType={item.user_type} name={item.name} mobile={item.mobile} key={index} index={index} status={item.status} item={item}></UserListComponent> :
                <UserListComponent userType={item.user_type} name={item.name} mobile={item.mobile} key={index} index={index} status={item.status} item={item}></UserListComponent> 
            )
          })}
        </ScrollView>


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

export default ListUsers;