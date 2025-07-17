import React, { memo, useCallback, useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { getBundleId } from 'react-native-device-info'
import { WalletLink } from '@helium/react-native-sdk'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import Hink from '@assets/images/hink.svg'
import Chotspot from '@assets/images/Chotspot.svg'
import Bhotspot from '@assets/images/Bhotspot.svg'
import Ehelium  from '@assets/images/Ehelium.svg'
import Scanning  from '@assets/images/Scanning.svg'
import Wifi  from '@assets/images/wifi.svg'
import { FlatList, Linking, Alert } from 'react-native'
import { useAsync } from 'react-async-hook'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import Button, {DebouncedButton} from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { EXPLORER_BASE_URL } from '../../../utils/config'
import { getAddress } from '../../../utils/secureAccount'
// import Animated from "react-native-reanimated";

const DATA = [
    {
      title: 'Link helium wallet                  ',
      icon :Hink,
    },
    {
      title: 'Set Wifi for hotspot                ',
      icon :Wifi,
    },
    {
      title: 'Add hotspot ( QR )                  ',
      icon :Scanning,
    },
    {
      title: 'Add hotspot ( BLE )                ',
      icon :Chotspot,
    },
    {
      title: 'Helium explorer                      ',
      icon :Ehelium,
    },
    {
      title: 'Buy hotspot                             ',
      icon :Bhotspot,
    }
  ]

const HotspotsScreen = () => {
  const { t } = useTranslation()
  // const { delegateApps } = WalletLink
  const navigation = useNavigation<RootNavigationProp>()
  const [accountAddress, setAccountAddress] = useState('')

  useAsync(async () => {
    const account = await getAddress()
    setAccountAddress(account || '')
  }, [])

  const onPress1 = (url: string) => {
    console.log('onPress1 url :' +url)
    if(url == 'Link helium wallet                  '){
        // Linking.openURL('https://www.helium.com/')
        const urld = WalletLink.createWalletLinkUrl({
          universalLink: "helium://",
          // universalLink: universalLink,
          requestAppId: getBundleId(),
          callbackUrl: 'makerappscheme://',
          appName: 'Maker App',
        })
        Linking.openURL(urld)
        console.log('openURL url:' +urld)
    }else if(url == 'Buy hotspot                             '){
        Linking.openURL(`https://explorer.helium.com/`)
    }else if(url == 'Add hotspot ( BLE )                '){
        navigation.push('HotspotSetup')
          // Alert.alert(
          //   "warn",
          //   "Please link helium Wallet"
          //     )
    }else if(url == 'Helium explorer                      '){
        Linking.openURL(`https://heliominer.net/payment`)
    }else if(url == 'Add hotspot ( QR )                  '){
      navigation.push('HotspotSetupEx')
  }else if(url == 'Set Wifi for hotspot                '){
    navigation.push('HotspotSetupDiag')
}
                            
  }

  return (
    <Box backgroundColor="primaryBackground" flex={1}>
      <BottomSheetModalProvider>
        <Box
          padding="l"
          flex={1}
          justifyContent="center"
          backgroundColor="black"
        >
          <Text variant="h3" color="primaryBackground" marginTop="l" marginBottom="m">Coship</Text>
        <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Button
                mode="contained"
                title={item.title}
                marginTop="ms"
                Icon={item.icon}
                onPress={() => onPress1(item.title)}
                // onPress={addHotspot}
              />
            )}
          />
          {/*<Button*/}
          {/*  onPress={addHotspot}*/}
          {/*  height={48}*/}
          {/*  marginTop="l"*/}
          {/*  mode="contained"*/}
          {/*  title={t('hotspots.empty.hotspots.add')}*/}
          {/*  Icon={AddIcon}*/}
          {/*/>*/}
          {/*<Button*/}
          {/*  onPress={assertHotspot}*/}
          {/*  height={48}*/}
          {/*  marginTop="l"*/}
          {/*  mode="contained"*/}
          {/*  title={t('hotspots.empty.hotspots.assertLocation')}*/}
          {/*/>*/}
          {/*<Button*/}
          {/*  onPress={transferHotspot}*/}
          {/*  height={48}*/}
          {/*  marginTop="l"*/}
          {/*  mode="contained"*/}
          {/*  title={t('hotspots.empty.hotspots.transfer')}*/}
          {/*/>*/}
        </Box>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(HotspotsScreen)
