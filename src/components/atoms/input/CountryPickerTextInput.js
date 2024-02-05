// import React, { useState } from 'react';
// import { View, TextInput, Modal, TouchableOpacity, Text } from 'react-native';
// import CountryPicker from 'react-native-country-picker-modal';


// const CountryPickerTextInput = () => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [selectedCountry, setSelectedCountry] = useState(null);
  
//     const handleCountrySelect = (country) => {
//       setSelectedCountry(country);
//       setModalVisible(false);
//     };
  
//     return (
//       <View>
//         <TouchableOpacity onPress={() => setModalVisible(true)}>
//           <Text>{selectedCountry ? selectedCountry.name : 'Select Country'}</Text>
//         </TouchableOpacity>
  
//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View>
//             <CountryPicker
//               onSelect={handleCountrySelect}
//               withFilter
//               withFlag
//               withAlphaFilter
//               withCallingCode
//             />
//             <TouchableOpacity onPress={() => setModalVisible(false)}>
//               <Text>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </View>
//     );
//   };
  
//   export default CountryPickerTextInput;
  