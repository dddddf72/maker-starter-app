import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HotspotSetupSelectionScreenc1 from './HotspotSetupSelectionScreenc1'
import HotspotSetupEducationScreen from './HotspotSetupEducationScreen'
import HotspotSetupScanningScreen from './HotspotSetupScanningScreen'
import HotspotSetupPickHotspotScreen from './HotspotSetupPickHotspotScreen'
import HotspotSetupWifiScreen from './HotspotSetupWifiScreen'
import defaultScreenOptions from '../../../navigation/defaultScreenOptions'
import HotspotSetupLocationInfoScreen from './HotspotSetupLocationInfoScreen'
import FirmwareUpdateNeededScreen from './FirmwareUpdateNeededScreen'
import HotspotSetupPickLocationScreen from './HotspotSetupPickLocationScreen'
import HotspotTxnsProgressScreen from './HotspotTxnsProgressScreen'
import HotspotSetupWifiConnectingScreen from './HotspotSetupWifiConnectingScreen'
import HotspotSetupConfirmLocationScreen from './HotspotSetupConfirmLocationScreen'
import HotspotSetupPickWifiScreen from './HotspotSetupPickWifiScreen'
import OnboardingErrorScreen from './OnboardingErrorScreen'
import HotspotSetupSkipLocationScreen from './HotspotSetupSkipLocationScreen'
import NotHotspotOwnerError from './NotHotspotOwnerError'
import OwnedHotspotError from './OwnedHotspotError'
import AntennaSetupScreen from './AntennaSetupScreen'
import HotspotSetupExternalScreen from './HotspotSetupExternalScreen'
import HotspotSetupExternalConfirmScreen from './HotspotSetupExternalConfirmScreen'
import HotspotSetupInstructionsScreen from './HotspotSetupInstructionsScreen'
import HotspotTxnsSubmitScreen from './HotspotTxnsSubmitScreen'

const HotspotSetupStack = createStackNavigator()

const HotspotSetup = () => {
  return (
    <HotspotSetupStack.Navigator
      headerMode="none"
      screenOptions={{ ...defaultScreenOptions }}
    >
      <HotspotSetupStack.Screen
        name="HotspotSetupSelectionScreenc1"
        component={HotspotSetupSelectionScreenc1}
        initialParams={{
          gatewayAction: 'addGateway',
        }}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupEducationScreen"
        component={HotspotSetupEducationScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupExternalScreen"
        component={HotspotSetupExternalScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupExternalConfirmScreen"
        component={HotspotSetupExternalConfirmScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupInstructionsScreen"
        component={HotspotSetupInstructionsScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupScanningScreen"
        component={HotspotSetupScanningScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupPickHotspotScreen"
        component={HotspotSetupPickHotspotScreen}
      />
      <HotspotSetupStack.Screen
        name="OnboardingErrorScreen"
        component={OnboardingErrorScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupPickWifiScreen"
        component={HotspotSetupPickWifiScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupWifiScreen"
        component={HotspotSetupWifiScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupWifiConnectingScreen"
        component={HotspotSetupWifiConnectingScreen}
      />
      <HotspotSetupStack.Screen
        name="FirmwareUpdateNeededScreen"
        component={FirmwareUpdateNeededScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupLocationInfoScreen"
        component={HotspotSetupLocationInfoScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupPickLocationScreen"
        component={HotspotSetupPickLocationScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupConfirmLocationScreen"
        component={HotspotSetupConfirmLocationScreen}
      />
      <HotspotSetupStack.Screen
        name="AntennaSetupScreen"
        component={AntennaSetupScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupSkipLocationScreen"
        component={HotspotSetupSkipLocationScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotTxnsProgressScreen"
        component={HotspotTxnsProgressScreen}
        options={{ gestureEnabled: false }}
      />
      <HotspotSetupStack.Screen
        name="NotHotspotOwnerErrorScreen"
        component={NotHotspotOwnerError}
      />
      <HotspotSetupStack.Screen
        name="OwnedHotspotErrorScreen"
        component={OwnedHotspotError}
      />
      <HotspotSetupStack.Screen
        name="HotspotTxnsSubmitScreen"
        component={HotspotTxnsSubmitScreen}
      />
    </HotspotSetupStack.Navigator>
  )
}

export default HotspotSetup
