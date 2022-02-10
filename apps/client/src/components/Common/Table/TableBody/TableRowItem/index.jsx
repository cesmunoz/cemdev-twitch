import React from 'react';
import PropTypes from 'prop-types';
import TableRowItemActions from '../TableRowItemActions';

function TableRowItem({ keys, item }) {
  const titleKeys = keys.filter((key) => !key.action);
  const actions = keys.filter((key) => key.action);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-left">
      {titleKeys.map((key) => (
        <td
          key={`${item.id}-${key.key}`}
          className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {item[key.key]}
        </td>
      ))}
      {actions.length > 0 && (
        <TableRowItemActions
          actions={actions}
          itemId={item.id}
        />
      )}
    </tr>
  );
}

TableRowItem.propTypes = {
  keys: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default TableRowItem;
