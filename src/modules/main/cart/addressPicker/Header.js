import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, withTheme} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {strings} from '../../../../locales/i18n';
import {appStyles} from '../../../../styles/styles';

const addButton = strings('main.cart.add');

/**
 * Component to header on checkout screens
 * @param navigation: required: to navigate to the respective screen
 * @param theme:application theme
 * @param title
 * @param show:indicates visibility of add button
 * @constructor
 * @returns {JSX.Element}
 */
const Header = ({theme, title, show, navigation}) => {
  const {colors} = theme;

  const onPressHandler = () => navigation.navigate('AddAddress');

  return (
    <View style={[styles.container, {backgroundColor: colors.white}]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={16} color={colors.accentColor}/>
      </TouchableOpacity>
      <View style={appStyles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
      {show && (
        <TouchableOpacity
          style={[styles.button, {borderColor: colors.accentColor}]}
          onPress={onPressHandler}>
          <Text style={{color: colors.accentColor}}>{addButton}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default withTheme(Header);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {fontSize: 22, fontWeight: '600'},
  button: {
    marginTop: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
});
