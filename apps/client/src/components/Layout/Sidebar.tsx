import {
  Box,
  BoxProps,
  Flex,
  useColorModeValue,
  Text,
  CloseButton,
} from '@chakra-ui/react';
import constants from '../../constants';
import NavItem from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

function Sidebar({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue(
        'gray.200',
        'gray.700',
      )}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold">
          {constants.APP_NAME}
        </Text>
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
        />
      </Flex>
      {constants.NAVIGATION_ITEMS.map((link) => (
        <NavItem
          key={link.name}
          name={link.name}
          icon={link.icon}
          path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}

export default Sidebar;
