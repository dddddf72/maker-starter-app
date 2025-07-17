import React, { useState, useCallback } from 'react'
import { Transfer, WalletLink } from '@helium/react-native-sdk'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, Linking, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-async-hook'
import Text from '../../components/Text'
import BackButton from '../../components/BackButton'
import Mailbox from '@assets/images/mailbox.svg'
import SafeAreaBox from '../../components/SafeAreaBox'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { getSecureItem } from '../../utils/secureAccount'
import {
  getBlockHeight,
  getChainVars,
  getHotspotDetails,
  getHotspotsLastChallengeActivity,
  submitTxn,
} from '../../utils/appDataClient'
import { RootStackParamList } from '../../navigation/main/tabTypes'
import {register, sendEmailCode} from '../../../src/utils/network/api'

type Route = RouteProp<RootStackParamList, 'TransferHotspot'>
const TransferHotspot = () => {
  console.log('123456789');
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const [hotspotAddress, setHotspotAddress] = useState('')
  const [newOwnerAddress, setNewOwnerAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reputPassword, setReputPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [hash, setHash] = useState<string>()

  // 验证码状态
  const [codeState, setCodeState] = useState('wait')
  // 验证码状态是否显示
  const [codeStateEnable, setCodeStateEnable] = useState(false)
  // 发送验证码按钮是否显示
  const [sendCaptchEnable, setSendCaptchEnable] = useState(true)
  // 发送验证码的提示
  const [sendCaptchTip, setSendCaptchTip] = useState('send captch')

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

  //跳转到首页
  const onDxiang = useCallback(() => navigation.push('MainTabs'), [
    navigation,
  ])

  /**
   * 获取验证码
   */
  const Verification = () => {
    // 合法性检查
    if (email == null || email.length <= 0) {
      return
    }

    // 发起请求
    setLoading(true)
    setSendCaptchEnable(false)
    setCodeStateEnable(true)
    sendEmailCode(email)
    .then(data => {
      setCodeState("has been sent")
    })
    .catch(error => {
      setSendCaptchTip("Resend")
      setSendCaptchEnable(true)
      setCodeStateEnable(false)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  /**
   * 注册
   */
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
    if (reputPassword == null || reputPassword.length <= 0) {
      Alert.alert(
        "warn",
        "reput password"
      )
      return
    }
    if (password != reputPassword) {
      Alert.alert(
        "warn",
        "password does not match"
      )
      return
    }
    if (verificationCode == null || verificationCode.length <= 0) {
      Alert.alert(
        "warn",
        "enter verification code"
      )
      return
    }


    // 发起请求
    setLoading(true)
    register(
      email,
      password,
      password,
      verificationCode
    )
    .then(data => {
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
      <BackButton
        marginHorizontal="n_lx"
        onPress={navigation.goBack}
        marginBottom="l"
        color="white"
      />
      <Text variant="h1" marginBottom="l"   marginTop="n_m" marginLeft="s" color="white">
        Regist
      </Text>

      <Text
        marginLeft="s"
        color='grey'
       >
       E-mail
       </Text>
      <TextInput
        marginTop='s'
        borderRadius="s"
        padding="s"
        marginBottom="m"
        backgroundColor="dark"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor="grey"
        // backgroundColor="primaryBackground"
        // placeholder={t('transferHotspot.enterHotspot')}
        placeholder="E-mail"
        color="white"
        editable={!loading}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        Icon={Mailbox}
      >
      </TextInput>
       <Text
        marginLeft="s"
        color='grey'
        marginTop='n_s'
       >
       Password
       </Text>

      <TextInput
        marginTop='s'
        borderRadius="s"
        padding="s"
        backgroundColor="dark"
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="grey"
        // placeholder={t('transferHotspot.enterOwner')}
        placeholder="Password"
        color="white"
        editable={!loading}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
     <Text
        marginLeft="s"
        color='grey'
        marginTop='s'
       >
      Reput password
       </Text>
      <TextInput
        marginTop='s'
        borderRadius="s"
        padding="s"
        marginBottom="m"
        backgroundColor="dark"
        onChangeText={setReputPassword}
        value={reputPassword}
        placeholderTextColor="grey"
        // backgroundColor="primaryBackground"
        // placeholder={t('transferHotspot.enterHotspot')}
        placeholder="Reput password"
        // Color="white"
        color="white"
        editable={!loading}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
        
       <Text
        marginLeft="s"
        color='grey'
        marginTop='n_s'
       >
       Verification code
       </Text>

      <TextInput
        marginTop='s'
        borderRadius="s"
        padding="s"
        backgroundColor="dark"
        onChangeText={setVerificationCode}
        value={verificationCode}
        placeholderTextColor="grey"
        // placeholder={t('transferHotspot.enterOwner')}
        placeholder="Verification code"
        color="white"
        editable={!loading}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
        
      <Text
        style={{alignSelf: 'flex-end'}}
        textAlign="right"
        marginRight='s'
        color='grey'
        marginTop='n_lx'
        onPress={Verification}
        visible={sendCaptchEnable}
       >
       {sendCaptchTip}
       </Text>
       <Text
        style={{alignSelf: 'flex-end'}}
        textAlign="right"
        marginRight='s'
        color='grey'
        marginTop='n_lx'
        visible={codeStateEnable}
       >
       {codeState}
       </Text>
      <Button
        title="Register"
        mode="contained"
        marginVertical="l"
        backgroundColor="blue"
        marginTop='lx'
        height={50}
        onPress={onSubmit}
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

export default TransferHotspot
