import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import BackScreen from '../../../components/BackScreen'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import Cloud from '../../../assets/images/cloud.svg'
import Box from '../../../components/Box'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'

type Route = RouteProp<HotspotSetupStackParamList, 'FirmwareUpdateNeededScreen'>

const FirmwareUpdateNeededScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<RootNavigationProp>()
  const handleClose = useCallback(() => navigation.navigate('MainTabs'), [
    navigation,
  ])

  return (
    <BackScreen onClose={handleClose}>
      <Box flex={1} justifyContent="center" paddingBottom="xxl">
        <Box flexDirection="row" justifyContent="center" marginBottom="m">
          <Cloud />
        </Box>
        <Text variant="h1" textAlign="center" marginBottom="m">
          {t('hotspot_setup.firmware_update.title')}
        </Text>
        <Text variant="subtitle1" textAlign="center">
          {t('hotspot_setup.firmware_update.subtitle')}
        </Text>
        <Box marginVertical="xl" flexDirection="row">
          <Box flex={1}>
            <Text variant="body2" textAlign="center" marginBottom="ms">
              {t('hotspot_setup.firmware_update.current_version')}
            </Text>
            <Text textAlign="center" variant="body1">
              {params.deviceFirmwareVersion || '12.45.1'}
            </Text>
          </Box>
          <Box flex={1}>
            <Text variant="body2" textAlign="center" marginBottom="ms">
              {t('hotspot_setup.firmware_update.required_version')}
            </Text>
            <Text textAlign="center" variant="body1">
              {params.minVersion || '1234.123.1'}
            </Text>
          </Box>
        </Box>
        <Text variant="body1" textAlign="center">
          {t('hotspot_setup.firmware_update.explanation')}
        </Text>
      </Box>
      <Box>
        <DebouncedButton
          mode="contained"
          onPress={() => navigation.navigate('MainTabs')}
          title={t('hotspot_setup.firmware_update.next')}
        />
      </Box>
    </BackScreen>
  )
}

export default FirmwareUpdateNeededScreen
