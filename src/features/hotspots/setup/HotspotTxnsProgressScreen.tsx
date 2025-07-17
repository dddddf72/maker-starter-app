import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { isString } from 'lodash'
import {
  useHotspotBle,
  HotspotErrorCode,
  WalletLink,
  Location,
  useOnboarding,
} from '@helium/react-native-sdk'
import { ActivityIndicator, Linking } from 'react-native'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { hotspotOnChain } from '../../../utils/appDataClient'
import useAlert from '../../../utils/useAlert'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'
import { getSecureItem } from '../../../utils/secureAccount'
import { useColors } from '../../../theme/themeHooks'
import { DebouncedButton } from '../../../components/Button'
import useMount from '../../../utils/useMount'
// import { getBundleId } from 'react-native-device-info'
// import Success from '../../assets/images/success.svg'
// import Setlocation from '../../../assets/images/Setlocation.svg'


type Route = RouteProp<HotspotSetupStackParamList, 'HotspotTxnsProgressScreen'>

const HotspotTxnsProgressScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<RootNavigationProp>()
  const { showOKAlert } = useAlert()
  const { createGatewayTxn } = useHotspotBle()
  const { getOnboardingRecord } = useOnboarding()
  const { primaryText } = useColors()

  const handleError = async (error: unknown) => {
    // eslint-disable-next-line no-console
    console.error(error)
    let titleKey = 'generic.error'
    let messageKey = 'generice.something_went_wrong'

    if (isString(error)) {
      if (error === HotspotErrorCode.WAIT) {
        messageKey = t('hotspot_setup.add_hotspot.wait_error_body')
        titleKey = t('hotspot_setup.add_hotspot.wait_error_title')
      } else {
        messageKey = `Got error code ${error}`
      }
    }

    await showOKAlert({ titleKey, messageKey })
    navigation.navigate('MainTabs')
  }

  const submitOnboardingTxns = async () => {
    const token = await getSecureItem('walletLinkToken')
    console.log('HotspotTxnsProgressScreen submitOnboardingTxns token '+token)
    if (!token) throw new Error('Token Not found')

    const parsed = WalletLink.parseWalletLinkToken(token)
    console.log('HotspotTxnsProgressScreen submitOnboardingTxns !parsed?.address  '+parsed?.address)

    if (!parsed?.address) throw new Error('Invalid Token')

    console.log('HotspotTxnsProgressScreen submitOnboardingTxns 1 ')


    const { address: ownerAddress } = parsed

    const { hotspotAddress, addGatewayTxn: qrAddGatewayTxn } = params

    if (!hotspotAddress) {
      if (qrAddGatewayTxn) {
        throw new Error('Hotspot not found')
      } else {
        throw new Error('Hotspot disconnected')
      }
    }
    console.log('HotspotTxnsProgressScreen submitOnboardingTxns 2 ')
    const updateParams = {
      token,
    } as WalletLink.SignHotspotRequest

    // check if add gateway needed
    const isOnChain = await hotspotOnChain(hotspotAddress)
    console.log('HotspotTxnsProgressScreen submitOnboardingTxns 3 isOnChain '+isOnChain)
    console.log('HotspotTxnsProgressScreen submitOnboardingTxns 3 hotspotAddress '+hotspotAddress)

    const onboardingRecord = await getOnboardingRecord(hotspotAddress)
    console.log(`HotspotTxnsProgressScreen submitOnboardingTxns 4 payerAddress ${onboardingRecord?.maker.address}`)
    console.log(`HotspotTxnsProgressScreen submitOnboardingTxns 4 ownerAddress ${ownerAddress}`)
    console.log(`HotspotTxnsProgressScreen submitOnboardingTxns 4 param1s.coords ${params.coords}`)

    if (!onboardingRecord) return
    if (!isOnChain) {
      // if so, construct and publish add gateway
      if (qrAddGatewayTxn) {
        // Gateway QR scanned
        updateParams.addGatewayTxn = qrAddGatewayTxn
      } else {
        console.log('Gateway BLE scanned.....')
        // Gateway BLE scanned
        const addGatewayTxn = await createGatewayTxn({
          ownerAddress,
          payerAddress: onboardingRecord.maker.address,
        })
        updateParams.addGatewayTxn = addGatewayTxn
        console.log('Gateway BLE scanned end addGatewayTxn '+addGatewayTxn)
      }
    }

    // construct and publish assert location
    if (params.coords) {
      const [lng, lat] = params.coords

      const assertLocationTxn = await Location.createLocationTxn({
        gateway: hotspotAddress,
        lat,
        lng,
        decimalGain: params.gain,
        elevation: params.elevation,
        dataOnly: false,
        owner: ownerAddress,
        // currentLocation: '', // If reasserting location, put previous location here
        makerAddress: onboardingRecord.maker.address,
        locationNonceLimit: onboardingRecord.maker.locationNonceLimit || 0,
      })
      updateParams.assertLocationTxn = assertLocationTxn.toString()
    }

    //sign
    const url = WalletLink.createUpdateHotspotUrl(updateParams)
    console.log('url :111111'+url)
    if (!url) {
      // eslint-disable-next-line no-console
      console.error('Link could not be created')
      return
    }
    Linking.openURL(url)

    // const urld = WalletLink.createWalletLinkUrl({
    //   universalLink: "helium://",
    //   // universalLink: universalLink,
    //   requestAppId: getBundleId(),
    //   callbackUrl: 'makerappscheme://',
    //   appName: 'Maker App',
    // })
    // Linking.openURL(urld)
  }

  useMount(() => {
    try {
      console.log('HotspotTxnsProgressScreen enter .....')
      submitOnboardingTxns()
      console.log('HotspotTxnsProgressScreen end .....')
    } catch (e) {
      handleError(e)
    }
  })

  return (
    <SafeAreaBox
      backgroundColor="black"
      flex={1}
      alignItems="center"
    >
      {/* <Box flex={1} /> */}

      <Box flex={1} justifyContent="center" marginTop="xxdl">
        <ActivityIndicator  color="peacockGreen" />
      </Box>

      <Text
        marginTop="xl"
        variant="body2"
        numberOfLines={1}
        adjustsFontSizeToFit
        textAlign="center"
        color="grey"
      >
         {t('hotspot_setup.progress.title_2')}
      </Text>
  
      <DebouncedButton
        marginTop="mc"
        marginBottom="xxl"
        justifyContent="flex-end"
        onPress={() => navigation.navigate('MainTabs')}
        variant="primary"
        mode="text"
        color="blue"
        title={t('generic.cancel')}
      />
    </SafeAreaBox>
  )
}

export default HotspotTxnsProgressScreen
