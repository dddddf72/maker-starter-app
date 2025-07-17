// import React, { useCallback } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useNavigation } from '@react-navigation/native'
// import Text from '../../../components/Text'
// import { OnboardingNavigationProp } from '../onboardingTypes'
// import Box from '../../../components/Box'
// import TextTransform from '../../../components/TextTransform'
// import SafeAreaBox from '../../../components/SafeAreaBox'
// import TouchableOpacityBox from '../../../components/TouchableOpacityBox'

// const WelcomeScreen = () => {
//   const { t } = useTranslation()
//   const navigation = useNavigation<OnboardingNavigationProp>()

//   const createAccount = useCallback(() => navigation.push('CreateAccount'), [
//     navigation,
//   ])

//   const importAccount = useCallback(() => navigation.push('LinkAccount'), [
//     navigation,
//   ])

//   return (
//     <SafeAreaBox
//       backgroundColor="primaryBackground"
//       flex={1}
//       paddingHorizontal="l"
//       alignItems="center"
//       paddingTop="xxxl"
//     >
//       <Text variant="h1">{t('account_setup.welcome.title')}</Text>
//       <TextTransform
//         variant="subtitle1"
//         marginVertical="xxl"
//         i18nKey="account_setup.welcome.subtitle"
//       />
//       <Box flex={1} />

//       <TouchableOpacityBox onPress={createAccount} width="100%" padding="l">
//         <Text variant="body1">{t('account_setup.welcome.create_account')}</Text>
//       </TouchableOpacityBox>

//       <TouchableOpacityBox onPress={importAccount} width="100%" padding="l">
//         <Text variant="body1">
//           {t('account_setup.welcome.login_with_helium')}
//         </Text>
//       </TouchableOpacityBox>
//     </SafeAreaBox>
//   )
// }

// export default WelcomeScreen

import React, { useState, useCallback, useEffect } from 'react'
// import { Transfer, WalletLink } from '@helium/react-native-sdk'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, Linking, Alert, AsyncStorage } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-async-hook'
import Text from '../../../components/Text'
import { DebouncedButton } from '../../../components/Button'
// import BackButton from '../../../components/BackButton'
// import Checkmark from '../../../assets/images/checkmark.svg'
// import Fail from '../../../assets/images/fail.svg'
// import Radio from '../../../assets/images/radio.svg'
import SafeAreaBox from '../../../components/SafeAreaBox'
import TextInput from '../../../components/TextInput'
import Button from '../../../components/Button'
// import { getSecureItem } from '../../../utils/secureAccount'
import {
  getBlockHeight,
  getChainVars,
  getHotspotDetails,
  getHotspotsLastChallengeActivity,
  submitTxn,
} from '../../../utils/appDataClient'
import { RootStackParamList } from '../../../navigation/main/tabTypes'
import {login} from '../../../utils/network/api'
import RadioModal from 'react-native-radio-master'
// import { Radio } from '@ant-design/react-native'


type Route = RouteProp<RootStackParamList, 'TransferHotspot'>
const Sign = () => {
  console.log('welcomeScreen');
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const [hotspotAddress, setHotspotAddress] = useState('')
  const [newOwnerAddress, setNewOwnerAddress] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [loading, setLoading] = useState(false)
  const [hash, setHash] = useState<string>()
  // const [radio, setRadio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // key
  const key_account = "coship_account_email"
  const key_password = "coship_account_password"
  const key_token = "coship_token"

  useEffect(() => {
    // 账户密码初始化值
    AsyncStorage.getItem(key_account)
      .then((value) => {
        if (value != null) setEmail(value)
      })
    AsyncStorage.getItem(key_password)
      .then((value) => {
        if (value != null) setPassword(value)
      })
  }, [])

  // handle callback from the Helium hotspot app
  useAsync(async () => {
    if (!params || !params.transferTxn) return

    // submit the signed transaction to the blockchain API
    setLoading(true)
    const signedTxnString = params.transferTxn
    const pendingTxn = await submitTxn(signedTxnString)
    setHash(pendingTxn.hash)
    setLoading(false)
  }, [params])

  
  //跳转外部链接
  // const register = useCallback(
  //   () => Linking.openURL(`https://www.baidu.com/`)
  // )
  //跳转到注册页面
  const register = useCallback(() => navigation.push('registerzc'), [
    navigation,
  ])

  //跳转到用户协议
  const agreement = useCallback(() => navigation.push('useragreement'), [
    navigation,
  ])

  //跳转到修改密码页面
  const modifypw = useCallback(() => navigation.push('modifypw'), [
    navigation,
  ])

  //跳转到首页
  const importAccount = useCallback(() => navigation.push('LinkAccount'), [
    navigation,
  ])

  const onSubmit = () => {
    // 合法性检查
    if (email == null || email.length <= 0) {
      Alert.alert(
        "warn",
        "enter email"
      )
      return
    }
    if (password == null || password.length <= 0) {
      Alert.alert(
        "warn",
        "enter password"
      )
      return
    }
    // if (radio == null || radio.length <= 0) {
    //   Alert.alert(
    //     "warn",
    //     "enter radio"
    //   )
    //   return
    // }



    // 发起请求
    setLoading(true)
    login(email, password)
    .then((data:any) => {
      AsyncStorage.setItem(key_account, email)
      AsyncStorage.setItem(key_password, password)
      AsyncStorage.setItem(key_token, data.token)
      importAccount()
    })
    .catch(error => {
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <SafeAreaBox
      placeholderTextColor="white"
      backgroundColor="black"
      flex={1}
      paddingHorizontal="m"
    >
      
      <Text variant="h1" marginBottom="l" marginTop="l" marginLeft="s" color="white">
        Coship
      </Text>

      <Text
        marginLeft="s"
        color='grey'
       >
       E-mail
      </Text>
       
      <TextInput
        inlineImageLeft='Fail'
        marginTop='ms'
        borderRadius="s"
        padding="s"
        marginBottom="m"
        backgroundColor="dark"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor="grey"
        placeholder="E-mail"
        color="white"
        editable={!loading}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      >
        {/* <Fail></Fail> */}
      </TextInput>
     
       <Text
        marginLeft="s"
        color='grey'
       >
       password
       </Text>

      <TextInput
        marginTop='ms'
        marginBottom="m"
        borderRadius="s"
        padding="s"
        backgroundColor="dark"
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="grey"
        // placeholder={t('transferHotspot.enterOwner')}
        placeholder="password"
        color="white"
        editable={!loading}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
     
      <RadioModal
        // onPress={modifypw}
        // onChangeText={setRadio}
        // editable={radio}
        onValueChange={(id, item) => ({ initId: id, initItem: item })}
      >
        <Text value="0"></Text>
      </RadioModal>

      <Text
        onPress={agreement}
        marginTop="n_lm"
        marginLeft="lm"
        color='grey'
       >
       I agree with&nbsp;
       <Text color="blue">
       Terms&nbsp;
       </Text>
       and&nbsp;
       <Text color="blue">
        Privacy Policy
        </Text>
       </Text>

      <Button
        title="login"
        mode="contained"
        marginVertical="l"
        backgroundColor="blue"
        marginTop='l'
        height={48}
        disabled={
           !email || !password || loading || hash !== undefined
        }
        onPress={onSubmit}
      />
      <Text
        onPress={modifypw}
        marginTop='none'
        color='grey'
       >
       Forgot password
       </Text>
       <Text textAlign="right"
        style={{alignSelf: 'flex-end'}}
        onPress={register}
        marginTop='n_lm'
        color='white'
       >
       Regist
       </Text>
       
       {/* <Button
        justifyContent="flex-end"
        variant="primary"
        title="Later"
        mode="contained"
        marginVertical="l"
        backgroundColor="dark"
        marginTop='xxl'
        width={120}
        height={48}
        onPress={importAccount}
      /> */}

      <DebouncedButton
        marginBottom="xxl"
        marginTop='xxl'
        justifyContent="flex-end"
        onPress={importAccount}
        variant="primary"
        // height={48}
        // width={120}
        // backgroundColor="dark"
        mode="text"
        color="blue"
        title="Later"
      />

      {loading && <ActivityIndicator size="small" color="peacockGreen" />}

      {hash !== undefined && (
        <>
          <Text variant="body1">{t('transferHotspot.submitComplete')}</Text>
          <Text variant="body1" selectable>
            {hash}
          </Text>
        </>
      )}
    </SafeAreaBox>
  )
}

export default Sign

