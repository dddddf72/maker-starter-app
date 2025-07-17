import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import Notfound from '../../../assets/images/notfound.svg'

import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupPickHotspotScreen'
>
const HotspotSetupBluetoothError = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  return (
    <Box flex={1}>
      <Box flex={1} alignItems="center" justifyContent="center">

        <Notfound width={200}></Notfound>

        <Text
          marginTop="n_xxl"
          maxFontSizeMultiplier={1}
          textAlign="center"
          numberOfLines={2}
          adjustsFontSizeToFit
          marginBottom="xxdl"
          color="grey"
          fontSize={18}
        >
          {t('hotspot_setup.ble_error.title')}
        </Text>
        <Text
          marginTop="n_xxl"
          maxFontSizeMultiplier={1}
          textAlign="center"
          numberOfLines={2}
          adjustsFontSizeToFit
          marginBottom="xxxxl"
          color="grey"
        >
          {t('hotspot_setup.ble_error.title_1')}
        </Text>
        <Box flexDirection="row">
        </Box>
      </Box>
      <DebouncedButton
        onPress={() => navigation.replace('HotspotSetupScanningScreen', params)}
        // mode="contained"
        height={50}
        // width={120}
        backgroundColor="dark"
        // marginLeft="xxyl"
        justifyContent="flex-end"
        variant="primary"
        title={t('generic.scan_again')}
        color="blue"
      />
    </Box>
  )
}

export default HotspotSetupBluetoothError
