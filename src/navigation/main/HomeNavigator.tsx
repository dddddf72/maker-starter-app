import React, { memo } from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import LockScreen from '../../features/lock/LockScreen'
import defaultScreenOptions from '../defaultScreenOptions'
import HotspotSetup from '../../features/hotspots/setup/HotspotSetupNavigator'
import HotspotSetupEx from '../../features/hotspots/setup/HotspotSetupNavigatorc1'
import HotspotSetupCo from '../../features/hotspots/setup/HotspotSetupScanningScreen'
import HotspotSetupExter from '../../features/hotspots/setup/HotspotSetupNavigatorcexter'
import HotspotSetupDiag from '../../features/hotspots/setup/HotspotSetupSelectionScreenPower'
import HotspotSetupPower from '../../features/hotspots/setup/HotspotSetupInstructionsScreenco'
import MainTabs from './MainTabNavigator'
import HotspotAssert from '../../features/hotspots/setup/HotspotAssertNavigator'
import TransferHotspot from '../../features/transferHotspot/TransferHotspot'
import Signcc from '../../features/transferHotspot/Signcc'
import modifypw from '../../features/transferHotspot/modifypw'
import registerzc from '../../features/transferHotspot/registerzc'
import HotspotsScreen from '../../features/hotspots/root/HotspotsScreen'
import LinkAccount from '../../features/onboarding/LinkAccount'

const HomeStack = createStackNavigator()

// 决定初始页
const initPage = () => {
  if (false) return Signcc
  else return MainTabs
}

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      mode="modal"
      screenOptions={({ route }) => {
        if (route.name === 'LockScreen')
          return { ...defaultScreenOptions, gestureEnabled: false }

        if (Platform.OS === 'android') return defaultScreenOptions
        return {}
      }}
    >
      <HomeStack.Screen
        name="InitPage"
        options={{ headerShown: false }}
        component={initPage()}
      />
      <HomeStack.Screen
        name="MainTabs"
        options={{ headerShown: false }}
        component={MainTabs}
      />
      <HomeStack.Screen
        name="HotspotSetup"
        component={HotspotSetup}
        options={{ headerShown: false, gestureEnabled: false }}
      />
       <HomeStack.Screen
        name="HotspotSetupEx"
        component={HotspotSetupEx}
        options={{ headerShown: false, gestureEnabled: false }}
      />
         <HomeStack.Screen
        name="HotspotSetupCo"
        component={HotspotSetupCo}
        options={{ headerShown: false, gestureEnabled: false }}
      />
       <HomeStack.Screen
        name="HotspotSetupExter"
        component={HotspotSetupExter}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="HotspotSetupDiag"
        component={HotspotSetupDiag}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="HotspotSetupPower"
        component={HotspotSetupPower}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="HotspotAssert"
        component={HotspotAssert}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="TransferHotspot"
        component={TransferHotspot}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="Signcc"
        component={Signcc}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="registerzc"
        component={registerzc}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="modifypw"
        component={modifypw}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="HotspotsScreen"
        component={HotspotsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="LockScreen"
        component={LockScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="LinkAccount"
        component={LinkAccount}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  )
}

export default memo(HomeStackScreen)
