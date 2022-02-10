import React from 'react';
import PropTypes from 'prop-types';

function TableRowItemActions({ actions, itemId }) {
  return (
    <td className="flex py-4 px-6 text-sm font-medium text-left whitespace-nowrap">
      {actions.map((action) => (
        <div
          key={action.action}
          onClick={() => action.action(itemId)}
          className="flex-1 cursor-pointer text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline"
        >
          {action.title}
        </div>
      ))}
    </td>
  );
}

TableRowItemActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    }),
  ).isRequired,
  itemId: PropTypes.number.isRequired,
};

export default TableRowItemActions;
