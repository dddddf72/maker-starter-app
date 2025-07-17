import React, { useCallback } from 'react'
import { uniq } from 'lodash'
import { useAsync } from 'react-async-hook'
import { ActivityIndicator } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { BleError, useHotspotBle } from '@helium/react-native-sdk'
import useAlert from '../../../utils/useAlert'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import Text from '../../../components/Text'
import Box from '../../../components/Box'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { getHotspotDetails } from '../../../utils/appDataClient'
import { getAddress } from '../../../utils/secureAccount'
import Load from '../../../assets/images/load.svg'



type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupWifiConnectingScreen'
>

const HotspotSetupWifiConnectingScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()

  const {
    params: { network, password, hotspotAddress, addGatewayTxn, hotspotType },
  } = useRoute<Route>()

  const { readWifiNetworks, setWifi, removeConfiguredWifi } = useHotspotBle()

  const { showOKAlert } = useAlert()

  const handleError = useCallback(
    async (err: unknown) => {
      let msg = ''

      if ((err as BleError).toString !== undefined) {
        msg = (err as BleError).toString()
      } else {
        msg = err as string
      }
      await showOKAlert({ titleKey: 'generic.error', messageKey: msg })
      navigation.goBack()
    },
    [navigation, showOKAlert],
  )

  const goToNextStep = useCallback(async () => {
    const address = await getAddress()
    // const hotspot = await getHotspotDetails(hotspotAddress)
    navigation.replace('HotspotSetupLocationInfoScreen', {
        hotspotAddress,
        addGatewayTxn,
        hotspotType,
      })

    // if (hotspot && hotspot.owner === address) {
    //   navigation.replace('OwnedHotspotErrorScreen')
    // } else if (hotspot && hotspot.owner !== address) {
    //   navigation.replace('NotHotspotOwnerErrorScreen')
    // } else {
    //   navigation.replace('HotspotSetupLocationInfoScreen', {
    //     hotspotAddress,
    //     addGatewayTxn,
    //     hotspotType,
    //   })
    // }
  }, [addGatewayTxn, hotspotAddress, hotspotType, navigation])

  const connectToWifi = useCallback(async () => {
    const response = await setWifi(network, password)
    if (response === 'not_found') {
      showOKAlert({
        titleKey: 'generic.error',
        messageKey: 'generic.something_went_wrong',
      })
      navigation.goBack()
    } else if (response === 'invalid') {
      showOKAlert({
        titleKey: 'generic.error',
        messageKey: 'generic.invalid_password',
      })
      navigation.goBack()
    } else {
      goToNextStep()
    }
  }, [goToNextStep, navigation, network, password, setWifi, showOKAlert])

  const forgetWifi = async () => {
    try {
      const connectedNetworks = uniq((await readWifiNetworks(true)) || [])
      if (connectedNetworks.length > 0) {
        await removeConfiguredWifi(connectedNetworks[0])
      }
    } catch (e) {
      handleError(e)
    }
  }

  useAsync(async () => {
    console.log('HotspotSetupWifiConnectingScreen forgetWifi start')
    await forgetWifi()
    console.log('HotspotSetupWifiConnectingScreen forgetWifi end')
    connectToWifi()
    console.log('HotspotSetupWifiConnectingScreen connectToWifi end')
  }, [])

  return (
    <SafeAreaBox flex={1} backgroundColor="black">
      <Box flex={1} justifyContent="center" paddingBottom="xxl">
        <Box justifyContent="center">
          {/* <Load width={56}></Load> */}
        <Box flex={1} justifyContent="center" marginBottom="xl" >
        <ActivityIndicator  color="peacockGreen"/>
        </Box>
          <Text fontSize={18}  color="grey" textAlign="center">
            {t('hotspot_setup.wifi_password.connecting').toUpperCase()}
          </Text>
        </Box>
      </Box>
    </SafeAreaBox>
  )
}

export default HotspotSetupWifiConnectingScreen
