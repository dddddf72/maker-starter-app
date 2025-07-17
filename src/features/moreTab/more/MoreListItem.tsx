import React, { memo, ReactText, useMemo } from 'react'
import { Linking, Switch } from 'react-native'
import Text, { TextProps } from '../../../components/Text'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import { useColors } from '../../../theme/themeHooks'
import CarotRight from '../../../assets/images/carot-right.svg'
import LinkImg from '../../../assets/images/link.svg'
import HeliumActionSheet from '../../../components/HeliumActionSheet'
import { HeliumActionSheetItemType } from '../../../components/HeliumActionSheetItem'
import Hink from '@assets/images/hink.svg'
import Chotspot from '@assets/images/Chotspot.svg'
import Bhotspot from '@assets/images/Bhotspot.svg'
import Ehelium  from '@assets/images/Ehelium.svg'
import Scanning  from '@assets/images/Scanning.svg'

export type SelectProps = {
  onDonePress?: () => void
  onValueSelect: (value: ReactText, index: number) => void
  items: HeliumActionSheetItemType[]
}

export type MoreListItemType = {
  icon: boolean
  title: string
  destructive?: boolean
  onPress?: () => void
  onToggle?: (value: boolean) => void
  value?: boolean | string | number
  select?: SelectProps
  openUrl?: string
}

const MoreListItem = ({
  item: { icon, title, value, destructive, onToggle, onPress, select, openUrl },
  isTop = false,
  isBottom = false,
}: {
  item: MoreListItemType
  isTop?: boolean
  isBottom?: boolean
}) => {
  const colors = useColors()

  const handlePress = () => {
    if (openUrl) {
      Linking.openURL(openUrl)
    }

    if (onPress) {
      onPress()
    }
  }

  const trackColor = useMemo(
    () => ({
      false: colors.secondaryBackground,
      true: colors.primaryBackground,
    }),
    [colors],
  )

  const actionSheetTextProps = useMemo(
    () =>
      ({
        variant: 'body2',
      } as TextProps),
    [],
  )

  return (
    <TouchableOpacityBox
      flexDirection="row"
      justifyContent="space-between"
      backgroundColor="dark"
      alignItems="center"
      height={48}
      paddingHorizontal="ms"
      marginBottom="xxxs"
      onPress={handlePress}
      disabled={!(onPress || openUrl)}
      borderTopLeftRadius={isTop ? 'm' : 'none'}
      borderTopRightRadius={isTop ? 'm' : 'none'}
      borderBottomLeftRadius={isBottom ? 'm' : 'none'}
      borderBottomRightRadius={isBottom ? 'm' : 'none'}
    > 
    {/* <Hink width="15"></Hink> */}
      <Text
        variant="body2"
        // color={destructive ? 'secondaryText' : 'primaryText'}
        color="white"
        // marginRight="cxxl"
      >
      {title}
      </Text>
      {!onToggle && !select && onPress && (
        <CarotRight color={colors.secondaryBackground} />
      )}
      {openUrl && <LinkImg />}
      {onToggle && (
        <Switch
          value={value as boolean}
          onValueChange={onToggle}
          trackColor={trackColor}
          thumbColor={colors.white}
        />
      )}
      {select && (
        <HeliumActionSheet
          data={select.items}
          selectedValue={value as string}
          onValueSelected={select.onValueSelect}
          title={title}
          textProps={actionSheetTextProps}
          iconVariant="none"           
        />
      )}
    </TouchableOpacityBox>
  )
}

export default memo(MoreListItem)
