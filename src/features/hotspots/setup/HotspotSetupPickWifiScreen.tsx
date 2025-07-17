import React, { useCallback, useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { uniq } from 'lodash'
import { useHotspotBle } from '@helium/react-native-sdk'
import BackScreen from '../../../components/BackScreen'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import Box from '../../../components/Box'
import CarotRight from '../../../assets/images/carot-right.svg'
import { useColors } from '../../../theme/themeHooks'
import { DebouncedButton } from '../../../components/Button'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import Checkmark from '../../../assets/images/check.svg'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { getAddress, getSecureItem } from '../../../utils/secureAccount'
import { getHotspotDetails } from '../../../utils/appDataClient'

const WifiItem = ({
  name,
  isFirst = false,
  isLast = false,
  icon = 'carot',
  onPress,
}: {
  name: string
  isFirst?: boolean
  isLast?: boolean
  icon?: 'carot' | 'check'
  onPress?: () => void
}) => {
  const colors = useColors()
  return (
    <TouchableOpacityBox
      onPress={onPress}
      backgroundColor="dark"
      padding="m"
      marginBottom="xxxs"
      flexDirection="row"
      justifyContent="space-between"
      borderTopLeftRadius={isFirst ? 'm' : 'none'}
      borderTopRightRadius={isFirst ? 'm' : 'none'}
      borderBottomLeftRadius={isLast ? 'm' : 'none'}
      borderBottomRightRadius={isLast ? 'm' : 'none'}
    >
      <Text variant="body2"  color="white">
        {name}
      </Text>
      {/* {icon === 'carot' && <CarotRight color={colors.secondaryBackground} />} */}
      {icon === 'check' && <Checkmark />}
    </TouchableOpacityBox>
  )
}

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotSetupPickWifiScreen'>
const HotspotSetupPickWifiScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()

  const {
    params: {
      networks,
      connectedNetworks,
      hotspotAddress,
      addGatewayTxn,
      hotspotType,
    },
  } = useRoute<Route>()
  const { readWifiNetworks } = useHotspotBle()

  const [wifiNetworks, setWifiNetworks] = useState(networks)
  const [connectedWifiNetworks, setConnectedWifiNetworks] =
    useState(connectedNetworks)
  const [scanning, setScanning] = useState(false)

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const hasNetworks = useMemo(() => {
    if (!wifiNetworks?.length) return false
    return wifiNetworks.length > 0
  }, [wifiNetworks])

  const navSkip = useCallback(async () => {
    console.log('navSkip start')
    const token = await getSecureItem('walletLinkToken')
    console.log(`navSkip end token:${token}`)
    if (!token) return
    const address = await getAddress()
    console.log(`navSkip address:${address}`)
    console.log('navSkip addGatewayTxn ', addGatewayTxn)
    console.log('navSkip hotspotType ', hotspotType)
    console.log(`navSkip hotspotAddress:${hotspotAddress}`)

    // const hotspot = await getHotspotDetails(hotspotAddress)
    // console.log(`navSkip hotspot:${hotspot}`)


     navigation.replace('HotspotSetupLocationInfoScreen', {
        hotspotAddress,
        addGatewayTxn,
        hotspotType,
      })

    // if (hotspot && hotspot.owner === address) {
    //   navigation.replace('OwnedHotspotErrorScreen')
    // } else if (hotspot && hotspot.owner !== address) {
    //   navigation.replace('NotHotspotOwnerErrorScreen')
    // } else {
    //   navigation.replace('HotspotSetupLocationInfoScreen', {
    //     hotspotAddress,
    //     addGatewayTxn,
    //     hotspotType,
    //   })
    // }
  }, [addGatewayTxn, hotspotAddress, navigation, hotspotType])

  const navNext = (network: string) => {
    navigation.navigate('HotspotSetupWifiScreen', {
      network,
      hotspotAddress,
      addGatewayTxn,
      hotspotType,
    })
  }

  const scanForNetworks = async () => {
    setScanning(true)
    const newNetworks = uniq((await readWifiNetworks(false)) || [])
    const newConnectedNetworks = uniq((await readWifiNetworks(true)) || [])
    setScanning(false)
    setWifiNetworks(newNetworks)
    setConnectedWifiNetworks(newConnectedNetworks)
  }

  return (
    <BackScreen
      padding="none"
      backgroundColor="black"
      onClose={handleClose}
    >
      <Box
        backgroundColor="black"
        padding="m"
        paddingTop="xs"
        // alignItems="center"
      >
        <Text
          variant="h1"
          // textAlign="center"
          marginLeft="m"
          marginBottom="s"
          maxFontSizeMultiplier={1}
          color="white"
        >
          WiFi
        </Text>
        <Text
          marginBottom="n_m"
          marginLeft="m"
          fontSize={16}
          maxFontSizeMultiplier={1.1}
          color="grey"
        >
          {t('hotspot_setup.wifi_scan.subtitle')}
        </Text>
      
      </Box>
      <Box paddingHorizontal="l" flex={1}  backgroundColor="black">
        <FlatList
          data={wifiNetworks}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Box marginTop="l">
              {connectedWifiNetworks.length > 0 && (
                <Box marginBottom="m">
                  <Text
                    // variant="body1"
                    fontSize={16}
                    marginBottom="m"
                    marginLeft="s"
                    maxFontSizeMultiplier={1.2}
                    color="grey"
                  >
                    {t('hotspot_setup.wifi_scan.saved_networks')}
                  </Text>
                 
                  {connectedWifiNetworks.map((network, index) => (
                    <WifiItem
                      key={network}
                      name={network}
                      isFirst={index === 0}
                      isLast={index === connectedWifiNetworks.length - 1}
                      icon="check"  
                      onPress={navSkip}
                    />
                  ))}
                </Box>
              )}
              <Text
                marginLeft="s"
                variant="body1"
                marginBottom="m"
                maxFontSizeMultiplier={1.2}
                visible={hasNetworks}
                color="grey"
              >
                {t('hotspot_setup.wifi_scan.available_networks')}
              </Text>
            </Box>
          }
          renderItem={({ item, index }) => (
            <WifiItem
              name={item}
              isFirst={index === 0}
              isLast={index === wifiNetworks.length - 1}
              onPress={() => navNext(item)}
            />
          )}
          ListEmptyComponent={
            <Box margin="l">
              <Text
                variant="body1"
                marginBottom="l"
                textAlign="center"
                color="primaryText"
              >
                {t('hotspot_setup.wifi_scan.not_found_title')}
              </Text>
              <Text variant="body1" textAlign="center" color="primaryText">
                {t('hotspot_setup.wifi_scan.not_found_desc')}
              </Text>
            </Box>
          }
        />
        <DebouncedButton
          loading={scanning}
          onPress={scanForNetworks}
          title={t('hotspot_setup.wifi_scan.scan_networks')}
          variant="primary"
          height={50}
          // width="90%"
          // marginVertical="s"
          marginTop="mc"
          marginBottom="xs"
          disabled={scanning}
          // mode="contained"
          color="white"
          backgroundColor="blue"
        />
        <DebouncedButton
          variant="primary"
          title={t('hotspot_setup.wifi_scan.ethernet')}
          // marginVertical="m"
          marginTop='s'
          marginBottom="m"
          height={50}
          onPress={navSkip}
          mode="contained"
        />
      </Box>
    </BackScreen>
  )
}

export default HotspotSetupPickWifiScreen
