/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import TableHeaderItem from './TableHeaderItem';

function TableHeader({ items }: { items: any }) {
  const titleKeys = items.filter((key: any) => !key.action);
  const hasActions = items.filter((key: any) => key.action);

  const headerItems = [
    ...titleKeys,
    ...(hasActions && [{ key: 'actions', title: '' }]),
  ];

  return (
    <thead className="bg-gray-50 dark:bg-gray-700">
      <tr>
        {headerItems.map((item) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TableHeaderItem key={item.key} {...item} />
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      action: PropTypes.func,
    }),
  ).isRequired,
};

export default TableHeader;
