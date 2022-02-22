import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';

const NAVIGATION_ITEMS = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'About', icon: FiTrendingUp, path: '/about' },
  { name: 'Requests', icon: FiCompass, path: '/requests' },
  { name: 'Histories', icon: FiStar, path: '/histories' },
  { name: 'Contact', icon: FiSettings, path: '/contact' },
];

const APP_NAME = 'CEMBOT';

export default { NAVIGATION_ITEMS, APP_NAME };
