import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import Box from '../../../components/Box'
import BackScreen from '../../../components/BackScreen'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import useGetLocation from '../../../utils/useGetLocation'
import Setlocation from '../../../assets/images/Setlocation.svg'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupLocationInfoScreen'
>

const HotspotSetupLocationInfoScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const maybeGetLocation = useGetLocation()

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const checkLocationPermissions = async () => {
    console.log('checkLocationPermissions');
    
    // await maybeGetLocation(true)
    navigation.navigate('HotspotSetupPickLocationScreen', params)
  }

  const skipLocationAssert = () => {
    navigation.navigate('HotspotSetupSkipLocationScreen', params)
  }

  return (
    <BackScreen
      onClose={handleClose}
      // backgroundColor="primaryBackground"
      backgroundColor="black"
      padding="l"
      color="white"
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
        {t('hotspot_setup.enable_location.title')}
      </Text>
      <Text marginLeft="lm">
      <Setlocation height={80} width={136}></Setlocation>
      </Text>

      <Text
        marginTop="xl"
        marginLeft="lm"
        fontSize={16}
        marginBottom="m"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="white"
      >
        {t('hotspot_setup.enable_location.subtitle')}
      </Text>
      <Text
        marginLeft="lm"
        fontSize={16}
        numberOfLines={2}
        adjustsFontSizeToFit
        maxFontSizeMultiplier={1.2}
        color="grey"
      >
        {t('hotspot_setup.enable_location.p_1')}
      </Text>
      <Box flex={1} />
      <DebouncedButton
        onPress={checkLocationPermissions}
        variant="primary"
        height={50}
        color="white"
        backgroundColor="blue"
        title={t('hotspot_setup.enable_location.next')}
        title="Scan Networks"
        // marginTop="xxxxl"
      />
      {/* <DebouncedButton
        onPress={skipLocationAssert}
        variant="primary"
        mode="text"
        title={t('hotspot_setup.enable_location.cancel')}
      /> */}
    </BackScreen>
  )
}

export default HotspotSetupLocationInfoScreen
