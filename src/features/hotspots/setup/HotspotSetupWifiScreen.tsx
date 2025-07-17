import React, { useState, useCallback } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import BackScreen from '../../../components/BackScreen'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import TextInput from '../../../components/TextInput'
import Button, { DebouncedButton } from '../../../components/Button'
import Box from '../../../components/Box'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import Hide from '../../../assets/images/hide.svg'
import Password from '../../../assets/images/password.svg'



type Route = RouteProp<HotspotSetupStackParamList, 'HotspotSetupWifiScreen'>
const HotspotSetupWifiScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()

  const {
    params: { network, hotspotAddress, addGatewayTxn, hotspotType },
  } = useRoute<Route>()
  const [password, setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const toggleSecureEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry)
  }, [secureTextEntry])

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const navNext = async () => {
    navigation.replace('HotspotSetupWifiConnectingScreen', {
      network,
      password,
      hotspotAddress,
      addGatewayTxn,
      hotspotType,
    })
  }

  return (
    <BackScreen onClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding"
      >
        <Box flex={1} >
          <Box>
            <Text
              variant="h1"
              textAlign="center"
              marginBottom="lm"
              maxFontSizeMultiplier={1}
              color="white"
            >
              {t('hotspot_setup.wifi_password.join_title')}
            </Text>
            <Text
              // variant="subtitle2"
              marginLeft="m"
              fontSize={16}
              marginBottom="lx"
              maxFontSizeMultiplier={1.2}
              color="grey"
            >
              {t('hotspot_setup.wifi_password.subtitle')}
            </Text>
            <Text fontSize={16}  color="grey"  marginLeft="m" marginBottom="xxs">
              {network}
            </Text>
          </Box>
          <TextInput
            marginTop="ms"
            // padding="m"
            variant="regular"
            placeholder={t('hotspot_setup.wifi_password.placeholder')}
            onChangeText={setPassword}
            value={password}
            keyboardAppearance="dark"
            autoCorrect={false}
            placeholderTextColor="grey"
            autoCompleteType="off"
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={navNext}
            secureTextEntry={secureTextEntry}
            autoFocus
          />

        {/* <Text>
          <Password width={20}></Password>
          <Hide 
            width={26}
            //  marginTop="s"
             onPress={toggleSecureEntry}
            //  variant="primary"
            //  mode="text"
            //  color="white"
             title={
               secureTextEntry
                 ? t('hotspot_settings.wifi.show_password')
                 : t('hotspot_settings.wifi.hide_password')
             }
          ></Hide>
          </Text> */}
          <Button
            marginTop="n_s"
            onPress={toggleSecureEntry}
            variant="primary"
            mode="text"
            color="white"
            title={
              secureTextEntry
                ? t('hotspot_settings.wifi.show_password')
                : t('hotspot_settings.wifi.hide_password')
            }
          />
        </Box>
      </KeyboardAvoidingView>
      <Box>
        <DebouncedButton
          onPress={navNext}
          variant="primary"
          mode="contained"
          title={t('generic.connect')}
          height={50}
          backgroundColor="blue"
        />
      </Box>
    </BackScreen>
  )
}

export default HotspotSetupWifiScreen

const styles = StyleSheet.create({ keyboardAvoidingView: { flex: 1 } })
