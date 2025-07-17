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
import Well from '../../../assets/images/well.svg'
import Power from '../../../assets/images/Power.svg'
import Tips from '../../../assets/images/tips.svg'


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

  const checkLocationPermissions = () => {
    console.log('checkLocationPermissions');
    
    // await maybeGetLocation(true)
    navigation.navigate('HotspotSetupPower', params)
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
        开机
      </Text>
      <Text marginTop="d_xxl" marginLeft="lm">
      <Power width={162}></Power>
      </Text>
   
      <Text
        marginTop="n_xxl"
        marginLeft="lm"
        fontSize={16}
        marginBottom="m"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="white"
      >
        将电源适配器插入靠窗的插座，并将天线插入Hotspot背面并旋紧
      </Text>
      <Text
        // marginTop="mc"
        marginLeft="lm"
        fontSize={15}
        marginBottom="m"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="blue"
      >
        当指示灯由红色变为黄色，即表示Hotspot准备就绪
      </Text>
      <Box flex={1} />
      <DebouncedButton
        onPress={checkLocationPermissions}
        variant="primary"
        height={50}
        color="white"
        backgroundColor="blue"
        // title={t('hotspot_setup.enable_location.next_1')}
        title={'我已开机'}
      />
    </BackScreen>
  )
}

export default HotspotSetupLocationInfoScreen

