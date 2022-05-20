import {
  FiCommand,
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';

const NAVIGATION_ITEMS = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'Commands', icon: FiCommand, path: '/commands' },
  { name: 'Requests', icon: FiCompass, path: '/requests' },
  { name: 'Histories', icon: FiStar, path: '/histories' },
  { name: 'About', icon: FiTrendingUp, path: '/about' },
  { name: 'Contact', icon: FiSettings, path: '/contact' },
];

const APP_NAME = 'CEMBOT';

export default { NAVIGATION_ITEMS, APP_NAME };
