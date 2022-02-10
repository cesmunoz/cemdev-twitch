import React from 'react';
import PropTypes from 'prop-types';

function TableHeaderItem({ title }) {
  return (
    <th
      scope="col"
      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
    >
      {title}
    </th>
  );
}

TableHeaderItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TableHeaderItem;
