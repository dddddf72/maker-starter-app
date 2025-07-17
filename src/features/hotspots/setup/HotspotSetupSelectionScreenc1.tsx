import React, { useCallback, useMemo, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import picture from '@assets/images/picture.svg'
import {
  BarCodeScanner,
  BarCodeScannerResult,
  usePermissions,
} from 'expo-barcode-scanner'
import { Camera } from 'expo-camera'
// import { RNCamera } from 'react-native-camera'
import { useDebouncedCallback } from 'use-debounce/lib'
import Toast from 'react-native-simple-toast'
import ImagePicker from 'react-native-image-crop-picker'
import LocalBarcodeRecognizer from 'react-native-local-barcode-recognizer'
import { DebouncedButton } from '../../../components/Button'
import { StyleSheet, Linking, ScrollView, Alert } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackScreen from '../../../components/BackScreen'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'
import { useColors, useBorderRadii } from '../../../theme/themeHooks'
import { getAddress } from '../../../utils/secureAccount'
import { useAppLinkContext } from '../../../providers/AppLinkProvider'
import useHaptic from '../../../utils/useHaptic'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { HotspotMakerModels } from '../../../makers'
import useMount from '../../../utils/useMount'
import navigator from '../../../navigation/navigator'


type Route = RouteProp<HotspotSetupStackParamList, 'HotspotSetupExternalScreen'>

const HotspotSetupExternalScreen = () => {
  const [flash, setFlash] = useState(false)
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const colors = useColors()
  const { xl } = useBorderRadii()
  const [address, setAddress] = useState<string>()
  const { handleBarCode } = useAppLinkContext()
  const { triggerNotification } = useHaptic()
  const navigation = useNavigation<RootNavigationProp>()

  const [perms] = usePermissions({
    request: true,
  })

  useMount(() => {
    getAddress().then(setAddress)
  })

  const handleClose = useCallback(() => navigation.navigate('MainTabs'), [
    navigation,
  ])

  const handleBarCodeScanned = useDebouncedCallback(
    (result: BarCodeScannerResult) => {
      try {
        handleBarCode(result, 'add_gateway', {
          hotspotType: params.hotspotType,
        })
        triggerNotification('success')
      } catch (error) {
        if (error.message) {
          Toast.showWithGravity(error.message, Toast.LONG, Toast.CENTER)
        }
        triggerNotification('error')
      }
    },
    1000,
    { leading: true, trailing: false },
  )


  const onBarCodeRead = useCallback((result) => {
    const { data } = result;
    //扫码后的操作 /// 这里会多次触发
    console.log(data,'111111111111111111111111111')
}, []
)
  

  const copyAddress = useCallback(() => {
    Clipboard.setString(address || '')
    triggerNotification('success')
    Toast.show(t('wallet.copiedToClipboard', { address }))
  }, [address, t, triggerNotification])

  const openMakerUrl = useCallback(
    (url: string) => async () => {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        await Linking.openURL(url)
      } else {
        Toast.showWithGravity(
          `Don't know how to open this URL: ${url}`,
          Toast.LONG,
          Toast.CENTER,
        )
      }
    },
    [],
  )

  const _pickerImg = async () => {
    // console.log('ImagePicker',ImagePicker);

    if (ImagePicker != null){
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: false,
        includeBase64:true
      }).then(image => {
        console.log("image.path", image.path)
        LocalBarcodeRecognizer.decode(image.data.replace("data:image/jpeg;base64,",""),{codeTypes:['ean13','qr']})
        .then(data => {
          console.log("data", data)
          navigator.confirmAddGateway(data)
        });
      });
    }
  }

 
  const subtitle = useMemo(() => {
    const onboard = t(`makerHotspot.${params.hotspotType}.externalOnboard`, {
      returnObjects: true,
    })

    const isArray = Array.isArray(onboard)
    if (isArray && onboard.length) {
      return onboard[0]
    }
    if (!isArray) {
      return onboard
    }
    return ''
  }, [params.hotspotType, t])

  const additionalPhrases = useMemo(() => {
    const onboard = t(`makerHotspot.${params.hotspotType}.externalOnboard`, {
      returnObjects: true,
    })

    const isArray = Array.isArray(onboard)
    if (isArray && onboard.length > 1) {
      const [, ...rest] = onboard
      return rest
    }
  }, [params.hotspotType, t])

  const scrollViewStyle = useMemo(() => ({ borderRadius: xl }), [xl])

  return (
    <BackScreen
      backgroundColor="primaryBackground"
      paddingTop={{ smallPhone: 's', phone: 'lx' }}
      onClose={handleClose}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={scrollViewStyle}>
        {/* <Box
          height={52}
          width={52}
          backgroundColor="secondaryBackground"
          borderRadius="m"
          alignItems="center"
          justifyContent="center"
        >
          <Icon color={colors.primary} width={24} height={24} />
        </Box> */}
        <Text
          variant="h1"
          numberOfLines={1}
          lineHeight={{ smallPhone: 42, phone: 62 }}
          fontSize={{ smallPhone: 28, phone: 40 }}
          adjustsFontSizeToFit
          marginTop="s"
          color="white"
        >
         {t('hotspot_setup.external.qrTitle')}
        </Text>
        <Text
          variant="subtitle1"
          color="grey"
          fontSize={{ smallPhone: 15, phone: 19 }}
          lineHeight={{ smallPhone: 20, phone: 26 }}
          maxFontSizeMultiplier={1}
          marginTop="l"
        >
          {t('hotspot_setup.external.instuructions')}
        </Text>
        <Text
          variant="subtitle1"
          color="white"
          fontSize={{ smallPhone: 15, phone: 19 }}
          lineHeight={{ smallPhone: 20, phone: 26 }}
          maxFontSizeMultiplier={1}
          marginTop="xs"
        >
          {t('hotspot_setup.external.wallet_address')}
        </Text>
        <TouchableOpacity onPress={copyAddress}>
          <Text variant="body2" maxFontSizeMultiplier={1} color="white" marginTop="s">
            {address}
          </Text>
        </TouchableOpacity>
            <Box flex={1} />
            <Box
              marginTop="lm"
              borderRadius="xl"
              overflow="hidden"
              width="100%"
              aspectRatio={1}
              backgroundColor="black"
            >
              {/* <RNCamera */}
               <Camera
               barCodeScannerSettings={{
                 barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
               }}
               onBarCodeScanned={handleBarCodeScanned.callback}
              //  ratio="1:1"
               style={StyleSheet.absoluteFill}
              
              // autoFocus={RNCamera.Constants.AutoFocus.on}/*自动对焦*/
              // style={[styles.preview]}
              // googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
              // type={RNCamera.Constants.Type.back}/*切换前后摄像头 front前back后*/
              // flashMode={flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}/*相机闪光模式*/
              // onBarCodeRead={onBarCodeRead}
              />
            </Box>

        <DebouncedButton
        Icon={picture}
        onPress={_pickerImg}
        variant="primary"
        marginTop="mc"
        height={56}
        color="bobcatGrey"
        backgroundColor="dark"
        title={t('hotspot_setup.external.picture')}
      />

        {additionalPhrases &&
          additionalPhrases.map((phrase, idx) => (
            <Text
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              variant="subtitle1"
              color="white"
              fontSize={{ smallPhone: 15, phone: 19 }}
              lineHeight={{ smallPhone: 20, phone: 26 }}
              marginTop={{ smallPhone: 's', phone: 'l' }}
              maxFontSizeMultiplier={1}
            >
              {phrase}
            </Text>
          ))}
      </ScrollView>
    </BackScreen>
  )
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row'
  },
  preview: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  rectangleContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  rectangle: {
      height: 200,
      width: 200,
      borderWidth: 1,
      borderColor: '#fcb602',
      backgroundColor: 'transparent',
      borderRadius: 10,
  },
  rectangleText: {
      flex: 0,
      color: '#fff',
      marginTop: 10
  },
  border: {
      flex: 0,
      width: 196,
      height: 2,
      backgroundColor: '#fcb602',
      borderRadius: 50
  }
});


export default HotspotSetupExternalScreen