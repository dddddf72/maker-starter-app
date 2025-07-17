import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DebouncedButton } from 'components/Button'
import Text from '../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from '../hotspotSetupTypes'
import Box from 'components/Box'
import BackScreen from '../../components/BackScreen'
import { RootNavigationProp } from '../../navigation/main/tabTypes'
import useGetLocation from '../../utils/useGetLocation'
import Well from 'assets/images/well.svg'
import Scenery from 'assets/images/scenery.svg'
import Tips from 'assets/images/tips.svg'


type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupLocationInfoScreen'
>

const HotspotSetupLocationInfoScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation
  const rootNav = useNavigation<RootNavigationProp>()
  const maybeGetLocation = useGetLocation()

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const checkLocationPermissions = async () => {
    console.log('checkLocationPermissions');
    
    // await maybeGetLocation(true)
    navigation.navigate('HotspotSetupEducationScreen', params)
  }

  const skipLocationAssert = () => {
    navigation.navigate('HotspotSetupSkipLocationScreen', params)
  }

  return (
    <BackScreen
      backgroundColor="black"
      marginTop="l"
      padding="l"
      color="white"
      onPress={navigation.goBack}
    >
      <Text
        variant="h4"
        marginVertical="l"
        maxFontSizeMultiplier={1}
        numberOfLines={2}
        adjustsFontSizeToFit
        marginTop="n_xxl"
        textAlign="center"
        color="white"
      >
        用户协议
      </Text>
    
      <Text
        marginLeft="l"
        variant="h4"
        fontSize={16}
        marginBottom="ms"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="white"
      >
        一、服务说明
      </Text>
      
      <Text
        marginLeft="l"
        fontSize={16}
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="grey"
      >
      1、本协议的效力、解释及纠纷的解决,适用于中华人民共和国法律。
      </Text>
      <Text
        marginTop="l"
        marginLeft="l"
        variant="h4"
        fontSize={16}
        marginBottom="ms"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="white"
      >
        二、服务说明
      </Text>
      
      <Text
        marginLeft="l"
        fontSize={16}
        marginBottom="m"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="grey"
      >
      1、本协议的效力、解释及纠纷的解决,适用于中华人民共和国法律。
      </Text>
    </BackScreen>
  )
}

export default HotspotSetupLocationInfoScreen

