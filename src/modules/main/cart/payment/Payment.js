import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../addressPicker/Header';
import {Text, withTheme} from 'react-native-elements';
import {appStyles} from '../../../../styles/styles';
import ContainButton from '../../../../components/button/ContainButton';
import RadioForm, {
  RadioButtonInput,
  RadioButton,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {strings} from '../../../../locales/i18n';
import {postData, getData} from '../../../../utils/api';
import {
  BASE_URL,
  INITIALIZE_ORDER,
  ON_INITIALIZE_ORDER,
} from '../../../../utils/apiUtilities';
import {Context as AuthContext} from '../../../../context/Auth';

const heading = strings('main.cart.checkout');
const buttonTitle = strings('main.cart.next');
const addressTitle = strings('main.cart.address');
const paymentOptionsTitle = strings('main.cart.payment_options');

const paymentOptions = [
  {value: 0, label: 'JusPay'},
  {value: 1, label: 'Cash on delivery'},
];

/**
 * Component to payment screen in application
 * @param navigation: required: to navigate to the respective screen
 * @param theme:application theme
 * @constructor
 * @returns {JSX.Element}
 */
const Payment = ({navigation, theme, route: {params}}) => {
  const {colors} = theme;
  const {selectedAddress, confirmationList} = params;
  const {
    state: {token},
  } = useContext(AuthContext);
  const [value, setValue] = useState(0);

  const onInitializeOrder = messageId => {
    const messageIds = messageId.toString();
    let order = setInterval(async () => {
      try {
        const {data} = await getData(
          `${BASE_URL}${ON_INITIALIZE_ORDER}messageIds=${messageIds}`,
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );
        console.log(JSON.stringify(data, undefined, 4));
      } catch (error) {
        console.log(error);
      }
    }, 2000);
    setTimeout(() => {
      clearInterval(order);
    }, 6000);
  };

  const initializeOrder = async () => {
    try {
      let payload = [];
      let bppIdArray = [];
      confirmationList.forEach(item => {
        if (item.provider) {
          const index = bppIdArray.findIndex(one => one === item.bpp_id);
          if (index > -1) {
            let itemObj = {
              id: item.id,
              quantity: {
                count: item.quantity.selected.count,
              },
              bpp_id: item.bpp_id,
              provider: {
                id: item.provider,
                locations: ['el'],
                //   locations: location,
              },
            };
            payload[index].message.items.push(itemObj);
          } else {
            let payloadObj = {
              context: {},
              message: {
                items: [
                  {
                    id: item.id,
                    quantity: {
                      count: item.quantity.selected.count,
                    },
                    bpp_id: item.bpp_id,
                    provider: {
                      id: item.provider,
                      locations: ['el'],
                    },
                  },
                ],
                billing_info: {
                  address: {
                    door: selectedAddress.address.door,
                    country: selectedAddress.address.country,
                    city: selectedAddress.address.city,
                    street: selectedAddress.address.street,
                    area_code: selectedAddress.address.area_code,
                    state: selectedAddress.address.state,
                    building: selectedAddress.address.building,
                  },
                  phone: selectedAddress.descriptor.phone,
                  name: selectedAddress.descriptor.name,
                  email: selectedAddress.descriptor.email,
                },
                delivery_info: {
                  type: 'HOME-DELIVERY',
                  name: selectedAddress.descriptor.name,
                  phone: selectedAddress.descriptor.phone,
                  email: selectedAddress.descriptor.email,
                  location: {
                    address: {
                      door: selectedAddress.address.door,
                      country: selectedAddress.address.country,
                      city: selectedAddress.address.city,
                      street: selectedAddress.address.street,
                      area_code: selectedAddress.address.area_code,
                      state: selectedAddress.address.state,
                      building: selectedAddress.address.building,
                    },
                  },
                },
              },
            };

            payload.push(payloadObj);
            bppIdArray.push(item.bpp_id);
          }
        }
      });

      const {data} = await postData(`${BASE_URL}${INITIALIZE_ORDER}`, payload, {
        headers: {Authorization: `Bearer ${token}`},
      });
      let messageIds = [];
      data.forEach(item => {
        messageIds.push(item.context.message_id);
      });

      onInitializeOrder(messageIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initializeOrder();
  }, []);

  return (
    <View
      style={[appStyles.container, {backgroundColor: colors.backgroundColor}]}>
      <Header title={heading} navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.text}>{addressTitle}</Text>
        <View style={styles.addressContainer}>
          <Text>
            {selectedAddress.address.street}, {selectedAddress.address.locality}
            , {selectedAddress.address.city}, {selectedAddress.address.state} -{' '}
            {selectedAddress.address.area_code}
          </Text>
        </View>

        <Text style={styles.text}>{paymentOptionsTitle}</Text>
        <View style={styles.addressContainer}>
          <RadioForm animation={true}>
            {paymentOptions.map((obj, i) => (
              <RadioButton
                labelHorizontal={true}
                key={i}
                style={styles.buttonStyle}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={i === value}
                  borderWidth={1}
                  buttonSize={12}
                  buttonOuterSize={20}
                  onPress={index => {
                    setValue(index);
                  }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  labelStyle={[styles.labelStyle, {color: colors.black}]}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ContainButton title={buttonTitle} />
      </View>
    </View>
  );
};

export default withTheme(Payment);

const styles = StyleSheet.create({
  container: {padding: 15},
  text: {fontSize: 18, fontWeight: '600'},
  buttonContainer: {width: 300, alignSelf: 'center'},
  addressContainer: {marginVertical: 15},
  labelStyle: {fontSize: 16, fontWeight: '400'},
  buttonStyle: {marginBottom: 10},
});
