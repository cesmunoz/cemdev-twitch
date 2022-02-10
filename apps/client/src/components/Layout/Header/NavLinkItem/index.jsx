import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NavLinkItem({ name, path, selected }) {
  const selectedClass = selected
    ? 'md:text-blue-700'
    : 'md:text-black';

  return (
    <li>
      <Link
        to={path}
        aria-current="page"
        className={`block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white ${selectedClass}`}
      >
        {name}
      </Link>
    </li>
  );
}

NavLinkItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default NavLinkItem;
