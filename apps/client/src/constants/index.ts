import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi';

const NAVIGATION_ITEMS = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'Commands', icon: FiZap, path: '/commands' },
  { name: 'Requests', icon: FiCompass, path: '/requests' },
  { name: 'Histories', icon: FiStar, path: '/histories' },
  { name: 'About', icon: FiTrendingUp, path: '/about' },
  { name: 'Contact', icon: FiSettings, path: '/contact' },
];

const APP_NAME = 'CEMBOT';

export default { NAVIGATION_ITEMS, APP_NAME };
