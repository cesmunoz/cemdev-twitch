import React from 'react';
import PropTypes from 'prop-types';
import TableRowItem from './TableRowItem';

function TableBody({ keys, items }) {
  return (
    <tbody>
      {items.map((item) => (
        <TableRowItem
          key={item.id}
          keys={keys}
          item={item}
        />
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  keys: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
};

export default TableBody;
