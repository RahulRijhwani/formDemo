/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import FlashMessage, {
  FlashMessageManager,
  showMessage,
  hideMessage,
} from 'react-native-flash-message';

import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const genders = ['Male', 'Female'];

const TextComponent = props => (
  <TouchableOpacity
    onPress={props?.onPress}
    activeOpacity={0.9}
    style={[
      styles.textContainer,
      {
        ...props?.style,
      },
    ]}>
    <View
      pointerEvents={props?.disable ? 'none' : 'auto'}
      style={styles.textViewContainer}>
      <TextInput
        placeholder={props?.title}
        placeholderTextColor={'grey'}
        value={props?.value}
        onChangeText={props?.onChangeText}
        style={styles.inputText}
      />
      {props?.rightIcon && (
        <Image
          source={props?.rightIcon}
          resizeMode={'contain'}
          style={styles.rightIconStyle}
        />
      )}
    </View>
  </TouchableOpacity>
);

const DropdownComponent = props => (
  <SelectDropdown
    data={genders}
    defaultButtonText={'Select Gender'}
    buttonStyle={styles.dropDownContainer}
    buttonTextStyle={styles.dropDownText}
    onSelect={props?.onSelect}
  />
);

const App = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userDob, setUserDob] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const alertMessage = (message = '', type = 'danger', position = 'bottom') => {
    let messageContainer = {
      message,
      type,
      position,
      floating: true,
    };

    showMessage(messageContainer);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setUserDob(date);
    hideDatePicker();
  };
  const onSubmit = () => {
    if (!userEmail || !emailRegex.test(userEmail)) {
      alertMessage('Please fill the valid email');
    } else if (!userName) {
      alertMessage('Please fill the valid name');
    } else if (!userDob) {
      alertMessage('Please fill the date of birth');
    } else if (!userGender) {
      alertMessage('Please select the gender');
    } else {
      alertMessage('Thank You', 'success');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.welcomeTxt}>Welcome</Text>
        <TextComponent
          style={styles.txtComponent}
          title={'Email'}
          value={userEmail}
          onChangeText={setUserEmail}
        />
        <TextComponent
          style={styles.txtComponent}
          title={'Name'}
          value={userName}
          onChangeText={setUserName}
        />
        <TextComponent
          style={styles.txtComponent}
          title={'Date Of Birth'}
          value={!!userDob && moment(userDob).format('DD MMM YYYY')}
          disable={true}
          onPress={showDatePicker}
          rightIcon={require('./assets/calendar.png')}
        />
        <DropdownComponent onSelect={setUserGender} />
        <TouchableOpacity onPress={onSubmit} style={styles.btnView}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <FlashMessage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  txtComponent: {width: '90%', alignSelf: 'center'},
  textContainer: {
    width: '100%',
    borderColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  textViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    color: 'black',
    paddingVertical: 10,
    flex: 1,
  },
  rightIconStyle: {width: 25, height: 25},
  dropDownContainer: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    width: '90%',
    backgroundColor: 'white',
  },
  dropDownText: {
    fontSize: 18,
    color: 'black',
  },
  btnView: {
    width: '90%',
    backgroundColor: 'blue',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: 'grey',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    marginVertical: 25,
  },
  btnText: {color: 'white', fontSize: 18},
  welcomeTxt: {fontSize: 25, color: 'black', marginBottom: 20},
});

export default App;
