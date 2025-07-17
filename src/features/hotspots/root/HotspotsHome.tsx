import React, { memo, useCallback, useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import Chotspot from '@assets/images/Chotspot.svg'
import Bhotspot from '@assets/images/Bhotspot.svg'
import Ehelium  from '@assets/images/Ehelium.svg'
import Hink from '@assets/images/hink.svg'
import { Linking } from 'react-native'
import { useAsync } from 'react-async-hook'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import Button from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { EXPLORER_BASE_URL } from '../../../utils/config'
import { getAddress } from '../../../utils/secureAccount'


const HotspotsScreen = () => {

  const { t } = useTranslation()
  const navigation = useNavigation<RootNavigationProp>()
  const [accountAddress, setAccountAddress] = useState('')

  useAsync(async () => {
    const account = await getAddress()
    setAccountAddress(account || '')
  }, [])

  const addHotspotyc = useCallback(
      () => Linking.openURL(`https://www.helium.com/`)
     )

  const addHotspot = useCallback(() => navigation.push('HotspotSetup'), [
    navigation,
  ])

  const assertHotspot = useCallback(() => navigation.push('HotspotSetup'), [
    navigation,
  ])

  const transferHotspot = useCallback(
    () => navigation.push('TransferHotspot'),
    [navigation],
  )

  const openExplorer = useCallback(
    () => Linking.openURL(`${EXPLORER_BASE_URL}/accounts/${accountAddress}`),
    [accountAddress],
  )

  return (
    <Box backgroundColor="black" flex={1}>
      <BottomSheetModalProvider>
        <Box
          padding="l"
          flex={1}
          marginTop="l"
          // justifyContent="center"
          backgroundColor="black"
        >
          <Text variant="h3" color="white">Coship</Text>
            <Button
            onPress={addHotspotyc}
            marginTop="l"
            mode="contained"
            title="link helium wallet"
            Icon={Hink}
          />
         
          <Button
            onPress={addHotspot}
            marginTop="m"
            mode="contained"
            title="hotspots.add&ensp; &ensp;&ensp;"
            Icon={Chotspot}
          />
          <Button
            onPress={assertHotspot}
            marginTop="m"
            mode="contained"
            // title={t('hotspots.empty.hotspots.assertLocation')}
            title="by hotspot&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;"
            Icon={Bhotspot}
          />
          <Button
            onPress={transferHotspot}
            marginTop="m"
            mode="contained"
            // title={t('hotspots.empty.hotspots.transfer')}
            title="helium explorer&ensp;"
            Icon={Ehelium}
          />
          
          {/* <Text variant="body1" marginTop="l">
            {t('hotspots.view_activity')}
            <Text variant="body1" color="primary" onPress={openExplorer}>
              {t('hotspots.explorer')}
            </Text>
            {t('generic.period')}
          </Text> */}
        </Box>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(HotspotsScreen)

//  import React, { memo, useCallback, useState } from 'react'
//  import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
//  import { getBundleId } from 'react-native-device-info'
//  import { WalletLink } from '@helium/react-native-sdk'
//  import { useTranslation } from 'react-i18next'
//  import { useNavigation } from '@react-navigation/native'
//  import Hink from '@assets/images/hink.svg'
//  import Chotspot from '@assets/images/Chotspot.svg'
//  import Bhotspot from '@assets/images/Bhotspot.svg'
//  import Ehelium  from '@assets/images/Ehelium.svg'
//  import { FlatList, Linking, Alert } from 'react-native'
//  import { useAsync } from 'react-async-hook'
//  import Box from 'components/Box'
//  import Text from 'components/Text'
//  import Button, {DebouncedButton} from 'components/Button'
//  import { RootNavigationProp } from '../../../navigation/main/tabTypes'
//  import { EXPLORER_BASE_URL } from '../../../utils/config'
//  import { getAddress } from '../../../utils/secureAccount'
//  // import Animated from "react-native-reanimated";
//  const DATA = [
//      {
//        title: 'Link helium wallet                  ',
//        icon :Hink,
//      },
//      {
//        title: 'Add hotspot                           ',
//        icon :Chotspot,
//      },
//      {
//        title: 'Buy hotspot                           ',
//        icon :Bhotspot,
//      },
//      {
//        title: 'Helium explorer                    ',
//        icon :Ehelium,
//      }
//    ]
//  const HotspotsScreen = () => {
//    const { t } = useTranslation()
//    // const { delegateApps } = WalletLink
//    const navigation = useNavigation<RootNavigationProp>()
//    const [accountAddress, setAccountAddress] = useState('')
//    useAsync(async () => {
//      const account = await getAddress()
//      setAccountAddress(account || '')
//    }, [])
//    const onPress1 = (url: string) => {
//      console.log('onPress1 url :'+url)
//      if(url == 'Link helium wallet                  '){
//        const urld = WalletLink.createWalletLinkUrl({
//          universalLink: "helium://",
//          requestAppId: getBundleId(),
//          callbackUrl: 'makerappscheme://',
//          appName: 'Maker App',
//        })
//        Linking.openURL(urld)
//      }else if(url == 'Buy hotspot                           '){
//        Linking.openURL(`https://explorer.helium.com/`)
//      }else if(url == 'Add hotspot                           '){
//        // navigation.push('HotspotSetup')
//        Alert.alert(
//          "warn",
//          "Please link helium Wallet"
//        )
//      }else if(url == 'Helium explorer                    '){
//        Linking.openURL(`https://heliominer.net/payment`)
//      }
//    }
//    return (
//      <Box backgroundColor="primaryBackground" flex={1}>
//        <BottomSheetModalProvider>
//          <Box
//            padding="l"
//            flex={1}
//            justifyContent="center"
//            backgroundColor="black"
//          >
//            <Text variant="h3" color="primaryBackground" marginTop="l" marginBottom="m">Coship</Text>
//          <FlatList
//              data={DATA}
//              renderItem={({ item }) => (
//                <Button
//                  mode="contained"
//                  title={item.title}
//                  marginTop="ms"
//                  Icon={item.icon}
//                  onPress={() => onPress1(item.title)}
//                  // onPress={addHotspot}
//                />
//              )}
//            />
//            {/*<Button*/}
//            {/*  onPress={addHotspot}*/}
//            {/*  height={48}*/}
//            {/*  marginTop="l"*/}
//            {/*  mode="contained"*/}
//            {/*  title={t('hotspots.empty.hotspots.add')}*/}
//            {/*  Icon={AddIcon}*/}
//            {/*/>*/}
//            {/*<Button*/}
//            {/*  onPress={assertHotspot}*/}
//            {/*  height={48}*/}
//            {/*  marginTop="l"*/}
//            {/*  mode="contained"*/}
//            {/*  title={t('hotspots.empty.hotspots.assertLocation')}*/}
//            {/*/>*/}
//            {/*<Button*/}
//            {/*  onPress={transferHotspot}*/}
//            {/*  height={48}*/}
//            {/*  marginTop="l"*/}
//            {/*  mode="contained"*/}
//            {/*  title={t('hotspots.empty.hotspots.transfer')}*/}
//            {/*/>*/}
//          </Box>
//        </BottomSheetModalProvider>
//      </Box>
//    )
//  }
//  export default memo(HotspotsScreen)
