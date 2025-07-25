import React, { useState, memo, useCallback, useMemo } from 'react'
import Box from '../../../components/Box'
import { DebouncedTouchableHighlightBox } from '../../../components/TouchableHighlightBox'
import { useColors } from '../../../theme/themeHooks'
import Text from '../../../components/Text'
import { HotspotMakerModels, HotspotType } from '../../../makers'

type Props = {
  isFirst: boolean
  isLast: boolean
  hotspotType: HotspotType
  onPress: () => void
}
const HotspotSetupSelectionListItem = ({
  isFirst,
  isLast,
  hotspotType,
  onPress,
}: Props) => {
  const colors = useColors()
  const [pressing, setPressing] = useState<boolean>()
  const svgColor = pressing ? colors.primary : colors.surfaceText
  const handlePressing = useCallback(
    (value: boolean) => () => setPressing(value),
    [],
  )

  const HotspotImage = useMemo(() => {
    const ListIcon = HotspotMakerModels[hotspotType].icon
    return <ListIcon color={svgColor} height="100%" width="100%" />
  }, [svgColor, hotspotType])

  return (
    <DebouncedTouchableHighlightBox
      backgroundColor="surface"
      width="100%"
      paddingHorizontal="m"
      underlayColor={colors.secondaryBackground}
      onPressIn={handlePressing(true)}
      onPressOut={handlePressing(false)}
      onPress={onPress}
      alignItems="center"
      flexDirection="row"
      borderTopLeftRadius={isFirst ? 'm' : 'none'}
      borderTopRightRadius={isFirst ? 'm' : 'none'}
      borderBottomLeftRadius={isLast ? 'm' : 'none'}
      borderBottomRightRadius={isLast ? 'm' : 'none'}
    >
      <>
        <Box height={34} width={34}>
          {HotspotImage}
        </Box>
        <Text
          variant="subtitle2"
          color={pressing ? 'primary' : 'surfaceText'}
          paddingVertical="l"
          paddingHorizontal="m"
          textAlign="center"
          numberOfLines={1}
          adjustsFontSizeToFit
          maxFontSizeMultiplier={1.1}
        >
          {HotspotMakerModels[hotspotType].name}
        </Text>
      </>
    </DebouncedTouchableHighlightBox>
  )
}

export default memo(HotspotSetupSelectionListItem)
