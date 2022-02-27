import { ReactText } from 'react';
import { IconType } from 'react-icons';
import { Flex, FlexProps, Icon } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path: string;
  name: string;
}

function NavItem({
  icon,
  children,
  path,
  name,
  // eslint-disable-next-line no-unused-vars
  ...rest
}: // eslint-disable-next-line no-use-before-define
NavItemProps) {
  return (
    <LinkRouter
      to={path}
      style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </LinkRouter>
  );
}

export default NavItem;
