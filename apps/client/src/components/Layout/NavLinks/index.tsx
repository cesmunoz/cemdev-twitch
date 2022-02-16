import React from 'react';
import { useLocation } from 'react-router-dom';
import constants from '../../../constants';
import NavLinkItem from '../NavLinkItem';

const { NAVIGATION_ITEMS } = constants;

function NavLinks() {
  const { pathname } = useLocation();

  return (
    <div
      className="w-full md:block md:w-auto"
      id="mobile-menu"
    >
      <ul className="flex mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        {NAVIGATION_ITEMS.map((item) => (
          <NavLinkItem
            key={item.name}
            selected={pathname === item.path}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...item}
          />
        ))}
      </ul>
    </div>
  );
}

export default NavLinks;
