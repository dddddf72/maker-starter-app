import React, { memo, useCallback, useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import AddIcon from '@assets/images/add.svg'
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

  const addHotspot = useCallback(() => navigation.push('HotspotSetup'), [
    navigation,
  ])

  const assertHotspot = useCallback(() => navigation.push('HotspotAssert'), [
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
    <Box backgroundColor="primaryBackground" flex={1}>
      <BottomSheetModalProvider>
        <Box
          padding="l"
          flex={1}
          justifyContent="center"
          // backgroundColor="primaryBackground"
          backgroundColor="white"
        >
          <Text variant="h2">{t('hotspots.empty.title')}</Text>
          <Text variant="body1" marginTop="ms">
            {t('hotspots.empty.body')}
          </Text>
          <Button
            onPress={addHotspot}
            height={48}
            marginTop="l"
            mode="contained"
            title={t('hotspots.empty.hotspots.add')}
            Icon={AddIcon}
          />
          <Button
            onPress={assertHotspot}
            height={48}
            marginTop="l"
            mode="contained"
            title={t('hotspots.empty.hotspots.assertLocation')}
            Icon={AddIcon}
          />
          <Button
            onPress={transferHotspot}
            height={48}
            marginTop="l"
            mode="contained"
            title={t('hotspots.empty.hotspots.transfer')}
            Icon={AddIcon}
          />
          <Text variant="body1" marginTop="l">
            {t('hotspots.view_activity')}
            <Text variant="body1" color="primary" onPress={openExplorer}>
              {t('hotspots.explorer')}
            </Text>
            {t('generic.period')}
          </Text>
        </Box>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(HotspotsScreen)
