import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useHotspotBle } from '@helium/react-native-sdk'
import { ActivityIndicator } from 'react-native'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import sleep from '../../../utils/sleep'
import { useColors } from '../../../theme/themeHooks'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotSetupScanningScreen'>

const SCAN_DURATION = 10000
const HotspotSetupScanningScreen = () => {
  const { t } = useTranslation()
  const { primaryText } = useColors()
  const { startScan, stopScan } = useHotspotBle()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()

  useEffect(() => {
    const scan = async () => {
      console.log('startScan1...')
      await startScan((error) => {
        if (error) {
          // TODO: handle error
          // eslint-disable-next-line no-console
          console.log(error)
        }
      })
      await sleep(SCAN_DURATION)
      stopScan()
      console.log('stopScan...')
      navigation.replace('HotspotSetupPickHotspotScreen', params)
    }
    scan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaBox
      backgroundColor="black"
      flex={1}
      alignItems="center"
    >
      {/* <Box flex={1} /> */}

      <Box flex={1} justifyContent="center" marginTop="xxdl">
        <ActivityIndicator  color="peacockGreen" />
      </Box>

      <Text
        marginTop="xl"
        variant="body2"
        numberOfLines={1}
        adjustsFontSizeToFit
        textAlign="center"
        color="grey"
      >
        {t('hotspot_setup.ble_scan.title')}
      </Text>
  
      <DebouncedButton
        marginTop="mc"
        marginBottom="xxl"
        justifyContent="flex-end"
        onPress={navigation.goBack}
        variant="primary"
        mode="text"
        color="blue"
        title={t('hotspot_setup.ble_scan.cancel')}
      />
    </SafeAreaBox>
  )
}

export default HotspotSetupScanningScreen
