// import React, { useState, useRef, useCallback } from 'react'
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
// import { useTranslation } from 'react-i18next'
// import Carousel, { Pagination } from 'react-native-snap-carousel'
// import BackScreen from '../../../components/BackScreen'
// import Box from '../../../components/Box'
// import Text from '../../../components/Text'
// import slides from './hotspotSetupSlides'
// import { wp } from '../../../utils/layout'
// import { DebouncedButton } from '../../../components/Button'
// import CarouselItem, {
//   CarouselItemData,
// } from '../../../components/CarouselItem'
// import {
//   HotspotSetupNavigationProp,
//   HotspotSetupStackParamList,
// } from './hotspotSetupTypes'
// import { useColors, useSpacing } from '../../../theme/themeHooks'
// import { RootNavigationProp } from '../../../navigation/main/tabTypes'

// type Route = RouteProp<
//   HotspotSetupStackParamList,
//   'HotspotSetupEducationScreen'
// >

// const HotspotEducationScreen = () => {
//   const { t } = useTranslation()
//   const navigation = useNavigation<HotspotSetupNavigationProp>()
//   const rootNav = useNavigation<RootNavigationProp>()
//   const carouselRef = useRef<Carousel<CarouselItemData>>(null)
//   const [slideIndex, setSlideIndex] = useState(0)
//   const [viewedSlides, setViewedSlides] = useState(false)
//   const { params } = useRoute<Route>()
//   const spacing = useSpacing()
//   const colors = useColors()

//   const navNext = () =>
//     navigation.push('HotspotSetupInstructionsScreen', {
//       ...params,
//       slideIndex: 0,
//     })

//   const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

//   const renderButton = () => {
//     if (viewedSlides) {
//       return (
//         <DebouncedButton
//           onPress={navNext}
//           variant="primary"
//           mode="contained"
//           title={t('learn.next')}
//           color="white"
//         />
//       )
//     }
//     return (
//       <DebouncedButton
//         variant="secondary"
//         mode="text"
//         onPress={navNext}
//         title={t('generic.skip')}
//         color="white"
//       />
//     )
//   }

//   const onSnapToItem = (index: number) => {
//     setSlideIndex(index)
//     if (index === slides.length - 1) {
//       setViewedSlides(true)
//     }
//   }
//   const renderItem = ({ item }: { item: CarouselItemData }) => (
//     <CarouselItem item={item} />
//   )

//   return (
//     <BackScreen
//       backgroundColor="primaryBackground"
//       padding="none"
//       justifyContent="center"
//       onClose={handleClose}
//     >
//       <Text
//         variant="h2"
//         numberOfLines={2}
//         paddingHorizontal="lx"
//         maxFontSizeMultiplier={1}
//         marginVertical={{ smallPhone: 's', phone: 'lx' }}
//         adjustsFontSizeToFit
//         color="white"
//       >
//         {t('hotspot_setup.education.title')}
//       </Text>

//       <Box flex={1} maxHeight={473}>
//         <Carousel
//           layout="default"
//           ref={carouselRef}
//           vertical={false}
//           data={slides}
//           renderItem={renderItem}
//           sliderWidth={wp(100)}
//           itemWidth={wp(90)}
//           inactiveSlideScale={1}
//           onSnapToItem={(i) => onSnapToItem(i)}
//         />
//         <Pagination
//           dotsLength={slides.length}
//           activeDotIndex={slideIndex}
//           dotStyle={{
//             width: 6,
//             height: 6,
//             borderRadius: 3,
//             marginHorizontal: spacing.s,
//             backgroundColor: colors.white,
//           }}
//           inactiveDotOpacity={0.4}
//           inactiveDotScale={1}
//         />
//       </Box>
//       <Box flexDirection="column" marginHorizontal="lx" marginBottom="s">
//         {renderButton()}
//       </Box>
//     </BackScreen>
//   )
// }

// export default HotspotEducationScreen

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { ActivityIndicator, Linking, Alert } from 'react-native'
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
import Diagnosisfrom from '../../../assets/images/diagnosis.svg'
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
    navigation.navigate('HotspotSetupInstructionsScreen', params)
  }

  const openExplorer = useCallback(
      () => Linking.openURL(`https://www.helio.com/faq`)
    )

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
        {t('hotspot_setup.enable_location.title_1')}
      </Text>
      <Text  marginLeft="lm" marginTop="lm">
      <Diagnosisfrom height={127} width={161}></Diagnosisfrom>
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
        {t('hotspot_setup.enable_location.subtitle_2')}
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
        {t('hotspot_setup.enable_location.c_2')}
      </Text>
      <Box backgroundColor="dark" height={1} width={272} marginLeft="lm" marginTop="xs"/>
      <Text
        marginTop="lm"
        marginLeft="lm"
        marginBottom="m"
        color="grey"
      >
        {t('hotspot_setup.enable_location.c_3')}&nbsp;&nbsp;&nbsp;
          <Text variant="body1" color="blue" onPress={openExplorer}>
              {t('hotspots.explorer_1')}
            </Text>&nbsp;&nbsp;&nbsp;
        {t('hotspot_setup.enable_location.c_4')}    
      </Text>

      <Box flex={1} />
      <DebouncedButton
        onPress={checkLocationPermissions}
        variant="primary"
        height={50}
        color="white"
        backgroundColor="blue"
        title={t('hotspot_setup.enable_location.next_2')}
      />
    </BackScreen>
  )
}

export default HotspotSetupLocationInfoScreen

