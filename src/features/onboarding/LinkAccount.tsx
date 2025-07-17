import React, { useEffect, memo, useMemo, useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Hotspots from '../../features/hotspots/root/HotspotsNavigator'
import { TabBarIconType, MainTabType, RootNavigationProp } from '../../navigation/main/tabTypes'
import TabBarIcon from '../../navigation/main/TabBarIcon'
// import More from '../../features/transferHotspot/Signcc'
// import Location from '../../features/hotspots/root/HotspotsNavigator'
import Search from '../../features/moreTab/MoreNavigator'
import { RootState } from '../../store/rootReducer'
import { useColors } from '../../theme/themeHooks'
import { useAppDispatch } from '../../store/store'
import { wp } from '../../utils/layout'
import appSlice from '../../store/user/appSlice'

const MainTab = createBottomTabNavigator()

const MainTabs = () => {
  const { surfaceContrast } = useColors()
  const navigation = useNavigation<RootNavigationProp>()
  const {
    app: { isLocked, isSettingUpHotspot },
  } = useSelector((state: RootState) => state)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLocked) return
    navigation.navigate('LockScreen', { requestType: 'unlock', lock: true })
  }, [isLocked, navigation])

  useEffect(() => {
    if (!isSettingUpHotspot) return

    dispatch(appSlice.actions.startHotspotSetup())
    navigation.navigate('HotspotSetup')
  }, [isSettingUpHotspot, dispatch, navigation])

  const sceneContainerStyle = useMemo(
    () => ({
      opacity: isLocked ? 0 : 1,
    }),
    [isLocked],
  )

  const tabBarOptions = useMemo(
    () => ({
      showLabel: false,
      style: {
        backgroundColor: surfaceContrast,
        paddingHorizontal: wp(12),
      },
    }),
    [surfaceContrast],
  )

  const screenOptions = useCallback(
    ({ route }) => ({
      tabBarIcon: ({ focused, color, size }: TabBarIconType) => {
        return (
          <TabBarIcon
            name={route.name as MainTabType}
            focused={focused}
            color={color}
            size={Math.min(size, 22)}
          />
        )
      },
    }),
    [],
  )

  return (
    <MainTab.Navigator
      sceneContainerStyle={sceneContainerStyle}
      initialRouteName="Hotspots"
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
    >
      <MainTab.Screen name="Hotspots" component={Hotspots} />
      {/* <MainTab.Screen name="More" component={More} /> */}
      {/* <MainTab.Screen name="Location" component={Location} /> */}
      <MainTab.Screen name="Search" component={Search} />
    </MainTab.Navigator>
  )
}

export default memo(MainTabs)


// import React, { memo, useCallback, useState } from 'react'
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
// import { getBundleId } from 'react-native-device-info'
// import { WalletLink } from '@helium/react-native-sdk'
// import { useTranslation } from 'react-i18next'
// import { useNavigation } from '@react-navigation/native'
// import Hink from '@assets/images/hink.svg'
// import Chotspot from '@assets/images/Chotspot.svg'
// import Bhotspot from '@assets/images/Bhotspot.svg'
// import Ehelium  from '@assets/images/Ehelium.svg'
// import { FlatList, Linking, Alert } from 'react-native'
// import { useAsync } from 'react-async-hook'
// import Box from 'components/Box'
// import Text from 'components/Text'
// import Button, {DebouncedButton} from 'components/Button'
// import { RootNavigationProp } from '../../../navigation/main/tabTypes'
// import { EXPLORER_BASE_URL } from '../../../utils/config'
// import { getAddress } from '../../utils/secureAccount'
// // import Animated from "react-native-reanimated";

// const DATA = [
//     {
//       title: 'Link helium wallet                  ',
//       icon :Hink,
//     },
//     {
//       title: 'Add hotspot                           ',
//       icon :Chotspot,
//     },
//     {
//       title: 'Buy hotspot                           ',
//       icon :Bhotspot,
//     },
//     {
//       title: 'Helium explorer                    ',
//       icon :Ehelium,
//     }
//   ]

// const HotspotsScreen = () => {
//   const { t } = useTranslation()
//   // const { delegateApps } = WalletLink
//   const navigation = useNavigation<RootNavigationProp>()
//   const [accountAddress, setAccountAddress] = useState('')

//   useAsync(async () => {
//     const account = await getAddress()
//     setAccountAddress(account || '')
//   }, [])

//   const onPress1 = (url: string) => {
//     console.log('onPress1 url :'+url)
//     if(url == 'Link helium wallet                  '){
//       const urld = WalletLink.createWalletLinkUrl({
//         universalLink: "helium://",
//         requestAppId: getBundleId(),
//         callbackUrl: 'makerappscheme://',
//         appName: 'Maker App',
//       })
//       Linking.openURL(urld)
//     }else if(url == 'Buy hotspot                           '){
//       Linking.openURL(`https://explorer.helium.com/`)
//     }else if(url == 'Add hotspot                           '){
//       // navigation.push('HotspotSetup')
//       Alert.alert(
//         "warn",
//         "Please link helium Wallet"
//       )
//     }else if(url == 'Helium explorer                    '){
//       Linking.openURL(`https://heliominer.net/payment`)
//     }

//   }
//   return (
//     <Box backgroundColor="primaryBackground" flex={1}>
//       <BottomSheetModalProvider>
//         <Box
//           padding="l"
//           flex={1}
//           justifyContent="center"
//           backgroundColor="black"
//         >
//           <Text variant="h3" color="primaryBackground" marginTop="l" marginBottom="m">Coship</Text>
//         <FlatList
//             data={DATA}
//             renderItem={({ item }) => (
//               <Button
//                 mode="contained"
//                 title={item.title}
//                 marginTop="ms"
//                 Icon={item.icon}
//                 onPress={() => onPress1(item.title)}
//                 // onPress={addHotspot}
//               />
//             )}
//           />
//           {/*<Button*/}
//           {/*  onPress={addHotspot}*/}
//           {/*  height={48}*/}
//           {/*  marginTop="l"*/}
//           {/*  mode="contained"*/}
//           {/*  title={t('hotspots.empty.hotspots.add')}*/}
//           {/*  Icon={AddIcon}*/}
//           {/*/>*/}
//           {/*<Button*/}
//           {/*  onPress={assertHotspot}*/}
//           {/*  height={48}*/}
//           {/*  marginTop="l"*/}
//           {/*  mode="contained"*/}
//           {/*  title={t('hotspots.empty.hotspots.assertLocation')}*/}
//           {/*/>*/}
//           {/*<Button*/}
//           {/*  onPress={transferHotspot}*/}
//           {/*  height={48}*/}
//           {/*  marginTop="l"*/}
//           {/*  mode="contained"*/}
//           {/*  title={t('hotspots.empty.hotspots.transfer')}*/}
//           {/*/>*/}
//         </Box>
//       </BottomSheetModalProvider>
//     </Box>
//   )
// }

// export default memo(HotspotsScreen)

