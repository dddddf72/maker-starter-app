import React, { memo } from 'react'
import Cog from '@assets/images/cog.svg'
import Hotspot from '@assets/images/home.svg'
import Location from '@assets/images/location-icon.svg'
import Search from '@assets/images/set.svg'
import Box from '../../components/Box'
import { MainTabType, TabBarIconType } from './tabTypes'
import { useColors } from '../../theme/themeHooks'

type Props = {
  name: MainTabType
} & TabBarIconType

const Icon = ({
  size,
  color,
  name,
}: {
  color: string
  size: number
  name: MainTabType
}) => 
{
   if (name === 'Hotspots') {
    return <Hotspot color={color} height={size} width={size} />
   }if (name === 'More') {
    return <Cog color={color} height={size} width={size} />
   }if (name === 'Location') {
    return <Location color={color} height={size} width={size} />
  }
    return <Search color={color} height={size} width={size} />
  }


const TabBarIcon = ({ name, focused, size }: Props) => {

  const { dark, blue } = useColors()
  const color = focused ? blue : dark

  return (
    <Box
      alignItems="center"
      flex={1}
      justifyContent="center"
      padding="xxxs"
    >
    <Icon size={size} color={color} name={name} />
    </Box>
  )
}

export default memo(TabBarIcon)
