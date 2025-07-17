import HotspotIcon from './hotspot.svg'
import { MakerHotspot } from '../hotspotMakerTypes'
import ANTENNAS from './antennas'

const ExampleHotspotBLE = {
  name: 'Example Hotspot BLE',
  icon: HotspotIcon,
  
  onboardType: 'BLE',
  translations: {
    en: {
      internal: [
        {
          title: '[title.a]',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          button: '[next button - 1]',
        },
        {
          title: '[title.b]',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          button: '[next button - 2]',
        },
        {
          title: '[title.c]',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          button: '[finish button]',
        },
      ],
    },
    ja: {},
    ko: {},
    zh: {},
  },
  antenna: {
    us: ANTENNAS.HELIO_US,
    default: ANTENNAS.HELIO_CN,
  },
} as MakerHotspot

const ExampleHotspotQR = {
  name: 'Example Hotspot QR',
  icon: HotspotIcon,
  onboardType: 'QR',
  translations: {
    en: {
      externalOnboard: 'Your instructions here',
    },
    ja: {},
    ko: {},
    zh: {},
  },
  antenna: {
    us: ANTENNAS.HELIO_US,
    default: ANTENNAS.HELIO_CN,
  },
} as MakerHotspot

export default { ExampleHotspotBLE, ExampleHotspotQR }
