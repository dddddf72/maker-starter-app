import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Linking, Platform, ScrollView, StyleSheet } from 'react-native'
import { useHotspotBle } from '@helium/react-native-sdk'
import { useSelector } from 'react-redux'
import BackScreen from '../../../components/BackScreen'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import TextTransform from '../../../components/TextTransform'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import Box from '../../../components/Box'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import useAlert from '../../../utils/useAlert'
import { useAppDispatch } from '../../../store/store'
import { getLocationPermission } from '../../../store/location/locationSlice'
import usePermissionManager from '../../../utils/usePermissionManager'
import { RootState } from '../../../store/rootReducer'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupInstructionsScreen'
>

const HotspotSetupDiagnosticsScreen = () => {
  const {
    params: { hotspotType, gatewayAction, slideIndex },
  } = useRoute<Route>()
  const { t, i18n } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const { enable, getState } = useHotspotBle()
  const { showOKCancelAlert } = useAlert()
  const dispatch = useAppDispatch()
  const { requestLocationPermission } = usePermissionManager()
  const { permissionResponse, locationBlocked } = useSelector(
    (state: RootState) => state.location,
  )

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const checkBluetooth = useCallback(async () => {
    const state = await getState()

    if (state === 'PoweredOn') {
      return true
    }

    if (Platform.OS === 'ios') {
      if (state === 'PoweredOff') {
        const decision = await showOKCancelAlert({
          titleKey: 'hotspot_setup.pair.alert_ble_off.title',
          messageKey: 'hotspot_setup.pair.alert_ble_off.body',
          okKey: 'generic.go_to_settings',
        })
        if (decision) Linking.openURL('App-Prefs:Bluetooth')
      } else {
        const decision = await showOKCancelAlert({
          titleKey: 'hotspot_setup.pair.alert_ble_off.title',
          messageKey: 'hotspot_setup.pair.alert_ble_off.body',
          okKey: 'generic.go_to_settings',
        })
        if (decision) Linking.openURL('app-settings:')
      }
    }
    if (Platform.OS === 'android') {
      await enable()
      return true
    }
  }, [enable, getState, showOKCancelAlert])

  useEffect(() => {
    getState()

    dispatch(getLocationPermission())
  }, [dispatch, getState])

  const checkLocation = useCallback(async () => {
    if (Platform.OS === 'ios') return true

    if (permissionResponse?.granted) {
      return true
    }

    if (!locationBlocked) {
      const response = await requestLocationPermission()
      if (response && response.granted) {
        return true
      }
    } else {
      const decision = await showOKCancelAlert({
        titleKey: 'permissions.location.title',
        messageKey: 'permissions.location.message',
        okKey: 'generic.go_to_settings',
      })
      if (decision) Linking.openSettings()
    }
  }, [
    locationBlocked,
    permissionResponse?.granted,
    requestLocationPermission,
    showOKCancelAlert,
  ])

  const handleNext = useCallback(async () => {
    const nextSlideIndex = slideIndex + 1
    const hasNext = i18n.exists(
      `makerHotspot.${hotspotType}.internal.${nextSlideIndex}`,
    )
    if (hasNext) {
      navigation.push('HotspotSetupInstructionsScreen', {
        hotspotType,
        slideIndex: nextSlideIndex,
        gatewayAction,
      })
    } else {
      await checkBluetooth()
      await checkLocation()
      navigation.push('HotspotSetupScanningScreen', {
        hotspotType,
        gatewayAction,
      })
    }
  }, [
    checkBluetooth,
    checkLocation,
    gatewayAction,
    hotspotType,
    i18n,
    navigation,
    slideIndex,
  ])

  return (
    <BackScreen
      onClose={handleClose}
      backgroundColor="black"
      padding="l"
    >
      <Text
        variant="h2"
        marginVertical="l"
        maxFontSizeMultiplier={1}
        numberOfLines={2}
        adjustsFontSizeToFit
        marginTop="n_m"
        marginLeft="lm"
        color="white"
      >
        {t('hotspot_setup.enable_location.title_2')}
      </Text>
      {/* <Text  marginLeft="lm" marginTop="lm">
      <Diagnosisfrom height={127} width={161}></Diagnosisfrom>
      </Text> */}
   
      <Text
        marginTop="l"
        marginLeft="lm"
        fontSize={16}
        marginBottom="m"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="white"
      >
        {t('hotspot_setup.enable_location.subtitle_3')}
      </Text>
      <Text
        marginLeft="lm"
        fontSize={16}
        marginBottom="m"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="grey"
      >
        {t('hotspot_setup.enable_location.d_1')}
      </Text>
      <Box backgroundColor="dark" height={1} width={272} marginLeft="lm" marginTop="xs"/>
      <Text
        marginLeft="lm"
        marginTop="lm"
        fontSize={16}
        marginBottom="m"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="blue"
      >
        {t('hotspot_setup.enable_location.d_2')}
      </Text>
      <Box flex={1} />
      <DebouncedButton
        onPress={handleNext}
        variant="primary"
        height={50}
        color="white"
        backgroundColor="blue"
        title={t('hotspot_setup.enable_location.next_3')}
      />
    </BackScreen>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HotspotSetupDiagnosticsScreen
