import React, { useState, useCallback, useEffect } from 'react'
import { Transfer, WalletLink } from '@helium/react-native-sdk'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, Linking, Alert, AsyncStorage } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-async-hook'
import Text from '../../components/Text'
import BackButton from '../../components/BackButton'
import Checkmark from '@assets/images/checkmark.svg'
import Fail from '../../assets/images/fail.svg'
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
import {login} from '../../../src/utils/network/api'

type Route = RouteProp<RootStackParamList, 'TransferHotspot'>
const Sign = () => {
  console.log('123456789');
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const [hotspotAddress, setHotspotAddress] = useState('')
  const [newOwnerAddress, setNewOwnerAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [hash, setHash] = useState<string>()
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

  //跳转到修改密码页面
  const modifypw = useCallback(() => navigation.push('modifypw'), [
    navigation,
  ])

  //跳转到首页
  const onDxiang = useCallback(() => navigation.push('MainTabs'), [
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

    // 发起请求
    setLoading(true)
    login(email, password)
    .then((data:any) => {
      AsyncStorage.setItem(key_account, email)
      AsyncStorage.setItem(key_password, password)
      AsyncStorage.setItem(key_token, data.token)
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
      
      <Text variant="h1" marginBottom="l"   marginTop="l" marginLeft="s" color="white">
        Coship
      </Text>

      <Text
        marginLeft="s"
        color='grey'
       >
       E-mail
      </Text>
       
      <TextInput
        // icon={Fail}
        marginTop='ms'
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
        // inlineImageLeft='search_icon'
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
       <Text
        onPress={register}
        marginTop='l'
        marginLeft="s"
        color='grey'
       >
       I agree with Terms and Privacy Policy
       </Text>
      <Button
        title="login"
        mode="contained"
        marginVertical="l"
        backgroundColor="blue"
        marginTop='l'
        height={48}
        // disabled={
        //   !hotspotAddress || !newOwnerAddress || loading || hash !== undefined
        // }
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
        onPress={register}
        marginTop='n_lm'
        color='white'
       >
       Regist
       </Text>
       
       <Button
        marginLeft='xxcl'
        title="Later"
        mode="contained"
        marginVertical="l"
        backgroundColor="dark"
        marginTop='xxl'
        width={120}
        height={48}    
        onPress={onDxiang}
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
