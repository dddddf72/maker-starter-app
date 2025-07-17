// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
// import React, { memo, useCallback, useMemo } from 'react'
// import { useTranslation } from 'react-i18next'
// import { FlatList } from 'react-native-gesture-handler'
// import { Edge } from 'react-native-safe-area-context'
// import BackScreen from '../../../components/BackScreen'
// import Box from '../../../components/Box'
// import Text from '../../../components/Text'
// import HotspotSetupSelectionListItem from './HotspotSetupSelectionListItem'
// import {
//   HotspotSetupNavigationProp,
//   HotspotSetupStackParamList,
// } from './hotspotSetupTypes'
// import {
//   HotspotType,
//   HotspotModelKeys,
//   HotspotMakerModels,
// } from '../../../makers'
// import { useBorderRadii } from '../../../theme/themeHooks'

// const ItemSeparatorComponent = () => (
//   <Box height={1} backgroundColor="primaryBackground" />
// )

// type Route = RouteProp<
//   HotspotSetupStackParamList,
//   'HotspotSetupSelectionScreen'
// >
// const HotspotSetupSelectionScreen = () => {
//   const { t } = useTranslation()
//   const navigation = useNavigation<HotspotSetupNavigationProp>()
//   const edges = useMemo((): Edge[] => ['top', 'left', 'right'], [])
//   const radii = useBorderRadii()

//   const { params } = useRoute<Route>()

//   const handlePress = useCallback(
//     (hotspotType: HotspotType) => () => {
//       const { onboardType } = HotspotMakerModels[hotspotType]
//       if (onboardType === 'BLE') {
//         navigation.push('HotspotSetupEducationScreen', {
//           hotspotType,
//           ...params,
//         })
//       } else {
//         navigation.push('HotspotSetupExternalScreen', {
//           hotspotType,
//           ...params,
//         })
//       }
//     },
//     [navigation, params],
//   )

//   const keyExtractor = useCallback((item) => item, [])

//   const data = useMemo(() => {
//     return HotspotModelKeys
//   }, [])

//   const renderItem = useCallback(
//     ({ item, index }) => {
//       const isFirst = index === 0
//       const isLast = index === data.length - 1
//       return (
//         <HotspotSetupSelectionListItem
//           isFirst={isFirst}
//           isLast={isLast}
//           hotspotType={item}
//           onPress={handlePress(item)}
//         />
//       )
//     },
//     [data.length, handlePress],
//   )

//   const flatListStyle = useMemo(() => {
//     return { flex: 1, borderRadius: radii.m }
//   }, [radii.m])

//   return (
//     <BackScreen
//       backgroundColor="primaryBackground"
//       paddingTop="m"
//       padding="lx"
//       hideBack
//       onClose={navigation.goBack}
//       edges={edges}
//     >
//       <Text variant="h1" numberOfLines={2} adjustsFontSizeToFit color="white">
//         {t('hotspot_setup.selection.title')}
//       </Text>
//       <Text
//         variant="subtitle1"
//         maxFontSizeMultiplier={1}
//         numberOfLines={2}
//         adjustsFontSizeToFit
//         marginVertical="l"
//         color="grey"
//       >
//         {t('hotspot_setup.selection.subtitle')}
//       </Text>

//       <FlatList
//         style={flatListStyle}
//         ItemSeparatorComponent={ItemSeparatorComponent}
//         data={data}
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         ListFooterComponent={<Box height={32} />}
//       />
//     </BackScreen>
//   )
// }

// export default memo(HotspotSetupSelectionScreen)

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
import Scenery from '../../../assets/images/scenery.svg'
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
        {t('hotspot_setup.enable_location.title')}
      </Text>
      <Text  marginLeft="s">
      <Scenery height={178} width={298}></Scenery>
      </Text>
   
      <Text
        marginTop="l"
        // marginLeft="lm"
        fontSize={16}
        marginBottom="m"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="grey"
      ><Well height={14}></Well>
        {t('hotspot_setup.enable_location.subtitle_1')}
      </Text>
      {/* <Box backgroundColor="dark" height={1} width={272} marginLeft="lm" marginTop="xs"/> */}
      <Text
        marginTop="mc"
        // marginLeft="lm"
        fontSize={16}
        marginBottom="m"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="grey"
      ><Tips height={14}></Tips>
        {t('hotspot_setup.enable_location.p_2')}
      </Text>
      <Text
        // marginLeft="xll"
        marginTop="mc"
        fontSize={16}
        marginBottom="m"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
        color="grey"
      ><Tips height={14}></Tips>
        {t('hotspot_setup.enable_location.p_3')}
      </Text>
      <Box flex={1} />
      <DebouncedButton
        onPress={checkLocationPermissions}
        variant="primary"
        height={50}
        color="white"
        backgroundColor="blue"
        title={t('hotspot_setup.enable_location.next_1')}
      />
    </BackScreen>
  )
}

export default HotspotSetupLocationInfoScreen

